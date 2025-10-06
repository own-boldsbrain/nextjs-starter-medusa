import { YelloLogo } from "@lib/design-system/components/YelloLogo"
import { Button } from "@lib/design-system/components/Button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-gradient-to-b from-geist-50 via-yello-yellow50 to-white">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 animate-pulse">
          <YelloLogo size={200} />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse delay-300">
          <YelloLogo size={150} />
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 small:px-32 gap-8">
        {/* Logo */}
        <div className="animate-fade-in-top">
          <YelloLogo size={120} className="mb-6" />
        </div>

        {/* Heading with gradient */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-5xl small:text-7xl font-black leading-tight bg-gradient-to-b from-[#FFCE00] via-[#FF6600] to-[#FF0066] bg-clip-text text-transparent">
            Energia Solar Inteligente
          </h1>
          <h2 className="text-xl small:text-2xl font-medium text-geist-600 max-w-2xl mx-auto">
            Dimensione, simule e gerencie sistemas fotovoltaicos com IA integrada
          </h2>
        </div>

        {/* CTAs */}
        <div className="flex flex-col small:flex-row gap-4 mt-6">
          <LocalizedClientLink href="/store">
            <Button variant="primary" size="lg" className="min-w-[200px]">
              Explorar Produtos
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/design-system">
            <Button variant="outline" size="lg" className="min-w-[200px]">
              Ver Design System
            </Button>
          </LocalizedClientLink>
        </div>

        {/* Features badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-geist-500">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <span className="text-yello-orange">●</span>
            <span>TIER Classification</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <span className="text-yello-magenta">●</span>
            <span>HSP Brazil Regions</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <span className="text-yello-yellow">●</span>
            <span>Sizing AI</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
