import { Metadata } from "next"
import { Heading, Text } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "About NRG - Premium Fashion",
  description: "Discover the story behind NRG, a premium fashion brand offering elevated clothing and accessories for every occasion.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100 py-20">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <Heading
              level="h1"
              className="text-5xl md:text-6xl font-bold text-gray-900 tracking-wider mb-6"
            >
              About NRG
            </Heading>
            <Text className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Crafting premium fashion experiences for the modern lifestyle
            </Text>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Our Story */}
          <section className="mb-16">
            <Heading
              level="h2"
              className="text-3xl font-bold text-gray-900 mb-6"
            >
              Our Story
            </Heading>
            <div className="prose prose-lg text-gray-600 space-y-6">
              <Text>
                Founded with a vision to redefine modern fashion, NRG emerged from a simple belief: 
                that clothing should be more than just fabric—it should be an expression of confidence, 
                style, and individuality.
              </Text>
              <Text>
                We curate each piece with meticulous attention to detail, ensuring that every garment 
                in our collection meets the highest standards of quality and design. From the initial 
                concept to the final stitch, we believe in the power of thoughtful craftsmanship.
              </Text>
              <Text>
                Our mission is to provide you with elevated fashion choices that seamlessly blend 
                contemporary trends with timeless elegance, creating a wardrobe that works for every 
                occasion in your life.
              </Text>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16">
            <Heading
              level="h2"
              className="text-3xl font-bold text-gray-900 mb-8"
            >
              Our Values
            </Heading>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">Q</span>
                </div>
                <Heading level="h3" className="text-xl font-semibold text-gray-900 mb-3">
                  Quality
                </Heading>
                <Text className="text-gray-600">
                  We source only the finest materials and work with skilled artisans to ensure every piece meets our exacting standards.
                </Text>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">S</span>
                </div>
                <Heading level="h3" className="text-xl font-semibold text-gray-900 mb-3">
                  Style
                </Heading>
                <Text className="text-gray-600">
                  Our designs blend contemporary trends with timeless elegance, creating pieces that transcend seasons.
                </Text>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">E</span>
                </div>
                <Heading level="h3" className="text-xl font-semibold text-gray-900 mb-3">
                  Ethics
                </Heading>
                <Text className="text-gray-600">
                  We're committed to sustainable practices and ethical manufacturing, ensuring a positive impact on our world.
                </Text>
              </div>
            </div>
          </section>

          {/* Our Promise */}
          <section className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <Heading
              level="h2"
              className="text-3xl font-bold text-gray-900 mb-6 text-center"
            >
              Our Promise to You
            </Heading>
            <div className="max-w-3xl mx-auto text-center">
              <Text className="text-lg text-gray-600 mb-6">
                When you choose NRG, you're not just buying clothing—you're investing in a lifestyle. 
                We promise to deliver exceptional quality, timeless style, and an unparalleled shopping experience.
              </Text>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <Text className="text-gray-600">
                    <strong>Premium Materials:</strong> Only the finest fabrics and materials
                  </Text>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <Text className="text-gray-600">
                    <strong>Expert Craftsmanship:</strong> Meticulously crafted by skilled artisans
                  </Text>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <Text className="text-gray-600">
                    <strong>Timeless Design:</strong> Pieces that remain stylish season after season
                  </Text>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                  <Text className="text-gray-600">
                    <strong>Exceptional Service:</strong> Dedicated customer support and care
                  </Text>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
