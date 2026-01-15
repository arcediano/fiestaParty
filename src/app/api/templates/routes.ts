import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const isPremium = searchParams.get('isPremium')
    const search = searchParams.get('search')

    // Base query
    const where: any = {}

    // Apply filters
    if (category) {
      where.category = category
    }

    if (isPremium !== null) {
      where.isPremium = isPremium === 'true'
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
      ]
    }

    // For non-authenticated users, only show free templates
    if (!session) {
      where.isPremium = false
    } else {
      // For free plan users, filter premium templates if they don't have active subscription
      const userWithSubscription = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          subscription: {
            include: { plan: true }
          }
        }
      })

      if (!userWithSubscription?.subscription || 
          userWithSubscription.subscription.status !== 'active' ||
          userWithSubscription.subscription.plan.name !== 'premium') {
        where.isPremium = false
      }
    }

    const templates = await prisma.template.findMany({
      where,
      include: {
        _count: {
          select: {
            invitations: true
          }
        }
      },
      orderBy: {
        usageCount: 'desc'
      },
      take: 50
    })

    // Transform data to match frontend expectations
    const transformedTemplates = templates.map(template => ({
      ...template,
      usageCount: template._count.invitations,
      rating: template.rating || 4.5 // Default rating if not set
    }))

    return NextResponse.json(transformedTemplates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: 'Error fetching templates' },
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

    // Check if user can create premium templates
    if (body.isPremium) {
      const userWithSubscription = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          subscription: {
            include: { plan: true }
          }
        }
      })

      if (!userWithSubscription?.subscription || 
          userWithSubscription.subscription.status !== 'active' ||
          userWithSubscription.subscription.plan.name !== 'premium') {
        return NextResponse.json(
          { error: 'Premium subscription required to create premium templates' },
          { status: 403 }
        )
      }
    }

    const template = await prisma.template.create({
      data: {
        ...body,
        creatorId: session.user.id
      }
    })

    return NextResponse.json(template)
  } catch (error) {
    console.error('Error creating template:', error)
    return NextResponse.json(
      { error: 'Error creating template' },
      { status: 500 }
    )
  }
}