import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/Button'

export const metadata: Metadata = {
  title: 'Invitaciones Digitales - Crea Invitaciones Únicas',
  description: 'Crea y gestiona invitaciones digitales para cumpleaños y eventos',
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent" />
            <span className="text-xl font-bold">Invitaciones Digitales</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary"
            >
              Iniciar Sesión
            </Link>
            <Button asChild>
              <Link href="/register">Crear Cuenta</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent" />
                <span className="text-xl font-bold">Invitaciones Digitales</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Crea invitaciones únicas para tus eventos especiales.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground">Características</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Precios</Link></li>
                <li><Link href="/templates" className="hover:text-foreground">Plantillas</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Compañía</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">Sobre Nosotros</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contacto</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/terms" className="hover:text-foreground">Términos</Link></li>
                <li><Link href="/privacy" className="hover:text-foreground">Privacidad</Link></li>
                <li><Link href="/cookies" className="hover:text-foreground">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Invitaciones Digitales. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}