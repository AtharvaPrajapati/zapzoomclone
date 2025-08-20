import { Truck, Shield, RotateCcw, Headphones, Star, Award } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders above ₹999",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment gateway",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "7-day hassle-free return policy",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round the clock customer support",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Handpicked premium quality fabrics",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Trusted Brand",
      description: "Trusted by thousands of customers",
      color: "from-indigo-500 to-purple-500"
    }
  ]

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">groomy solutions</span>?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            We're committed to providing you with the best shopping experience and premium quality products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                10K+
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                500+
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                50+
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1 sm:mb-2">
                4.8★
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm md:text-base">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
