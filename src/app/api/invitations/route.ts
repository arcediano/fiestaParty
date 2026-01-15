import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const where: any = {
      organizerId: session.user.id
    }

    if (status) {
      where.status = status
    }

    const [invitations, total] = await Promise.all([
      prisma.invitation.findMany({
        where,
        include: {
          _count: {
            select: {
              guests: true
            }
          },
          template: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: limit,
        skip: offset
      }),
      prisma.invitation.count({ where })
    ])

    return NextResponse.json({
      invitations,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })
  } catch (error) {
    console.error('Error fetching invitations:', error)
    return NextResponse.json(
      { error: 'Error fetching invitations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Check user's subscription for limits
    const userWithSubscription = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        subscription: {
          include: { plan: true }
        },
        _count: {
          select: {
            invitations: true
          }
        }
      }
    })

    if (!userWithSubscription) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const plan = userWithSubscription.subscription?.plan || { name: 'free', limits: { maxInvitations: 10 } }
    
    // Check invitation count limit
    if (userWithSubscription._count.invitations >= plan.limits.maxInvitations) {
      return NextResponse.json(
        { 
          error: 'Invitation limit reached',
          message: `Upgrade to premium to create more than ${plan.limits.maxInvitations} invitations`
        },
        { status: 403 }
      )
    }

    // Check guest limit
    if (body.maxGuests > plan.limits.maxGuests) {
      return NextResponse.json(
        { 
          error: 'Guest limit exceeded',
          message: `Upgrade to premium to invite more than ${plan.limits.maxGuests} guests`
        },
        { status: 403 }
      )
    }

    // Check if template is premium and user has access
    if (body.templateId) {
      const template = await prisma.template.findUnique({
        where: { id: body.templateId }
      })

      if (template?.isPremium && plan.name !== 'premium') {
        return NextResponse.json(
          { 
            error: 'Premium template requires premium subscription',
            message: 'Upgrade to premium to use this template'
          },
          { status: 403 }
        )
      }
    }

    const invitation = await prisma.invitation.create({
      data: {
        ...body,
        organizerId: session.user.id,
        settings: body.settings || {}
      },
      include: {
        template: true
      }
    })

    return NextResponse.json(invitation, { status: 201 })
  } catch (error) {
    console.error('Error creating invitation:', error)
    return NextResponse.json(
      { error: 'Error creating invitation' },
      { status: 500 }
    )
  }
}