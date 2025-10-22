import { Metadata } from "next"
import { Button, Heading, Text, Input, Textarea } from "@medusajs/ui"

export const metadata: Metadata = {
  title: "Contact NRG - Premium Fashion",
  description: "Get in touch with NRG. We're here to help with any questions about our premium fashion collection.",
}

export default function ContactPage() {
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
              Contact Us
            </Heading>
            <Text className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Text>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Heading
                level="h2"
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                Send us a Message
              </Heading>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <Heading
                level="h2"
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                Get in Touch
              </Heading>
              
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <Heading level="h3" className="text-lg font-semibold text-gray-900 mb-1">
                      Email Us
                    </Heading>
                    <Text className="text-gray-600 mb-2">
                      Send us an email and we'll respond within 24 hours.
                    </Text>
                    <Text className="text-gray-900 font-medium">
                      hello@nrg.com
                    </Text>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <Heading level="h3" className="text-lg font-semibold text-gray-900 mb-1">
                      Call Us
                    </Heading>
                    <Text className="text-gray-600 mb-2">
                      Monday to Friday, 9am to 6pm EST
                    </Text>
                    <Text className="text-gray-900 font-medium">
                      +1 (555) 123-4567
                    </Text>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <Heading level="h3" className="text-lg font-semibold text-gray-900 mb-1">
                      Visit Us
                    </Heading>
                    <Text className="text-gray-600 mb-2">
                      Our flagship store in the heart of the city
                    </Text>
                    <Text className="text-gray-900 font-medium">
                      123 Fashion Avenue<br />
                      New York, NY 10001
                    </Text>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <Heading level="h3" className="text-xl font-semibold text-gray-900 mb-6">
                  Frequently Asked Questions
                </Heading>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <Text className="font-medium text-gray-900 mb-2">
                      What is your return policy?
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      We offer a 30-day return policy for all unworn items with original tags.
                    </Text>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <Text className="font-medium text-gray-900 mb-2">
                      How long does shipping take?
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Standard shipping takes 3-5 business days, express shipping 1-2 business days.
                    </Text>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <Text className="font-medium text-gray-900 mb-2">
                      Do you offer international shipping?
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Yes, we ship worldwide with tracking and insurance included.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
