import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[80vh] w-full relative bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 gap-8">
        {/* Main Logo */}
        <Heading
          level="h1"
          className="text-6xl md:text-8xl font-bold text-gray-900 tracking-wider"
          style={{ letterSpacing: '0.1em' }}
        >
          NRG
        </Heading>
        
        {/* Tagline */}
        <Text className="text-lg md:text-xl text-gray-600 font-light max-w-md">
          Elevated Fashion for Every Occasion
        </Text>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <LocalizedClientLink href="/collections/women">
            <Button 
              size="xlarge" 
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all duration-300 hover:scale-105"
            >
              Shop Women
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/collections/men">
            <Button 
              size="xlarge" 
              variant="secondary"
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium transition-all duration-300 hover:scale-105"
            >
              Shop Men
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default Hero
