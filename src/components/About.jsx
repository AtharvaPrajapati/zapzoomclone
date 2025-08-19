import { Award, Users, Heart, Sparkles } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "We source only the finest fabrics and materials to ensure every piece meets our high standards of quality and craftsmanship."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Our customers are at the heart of everything we do. We strive to provide exceptional service and support at every step."
    },
    {
      icon: Heart,
      title: "Passion for Fashion",
      description: "We are passionate about creating beautiful, comfortable, and stylish ethnic wear that celebrates Indian culture and tradition."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We continuously innovate our designs and processes to bring you the latest trends while maintaining traditional elegance."
    }
  ]

  return (
    <section id="about" className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            About <span className="text-primary-500">ZapZoom</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Welcome to ZapZoom Technologies Private Limited, your premier destination for elegant and stylish women's ethnic fashion.
            Based in the heart of India, we are passionate about providing high-quality, trendy, and comfortable Kurtis and Sarees
            that cater to the diverse fashion tastes of modern women.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-12 lg:mb-16">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Traditional Indian Fashion"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"></div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20"></div>
          </div>

          {/* Content */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Crafting Elegance Since Our Beginning
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              At ZapZoom, we believe that every woman deserves to feel beautiful and confident in what she wears.
              Our carefully curated collection features traditional Indian ethnic wear with a modern twist,
              perfect for both everyday wear and special occasions.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Whether you're looking for something casual for daily wear or a chic outfit for a special occasion,
              we've got you covered. Our designs celebrate the rich heritage of Indian fashion while embracing
              contemporary style and comfort.
            </p>

            {/* Key Points */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-600">Handpicked premium quality fabrics and materials</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-600">Traditional craftsmanship with modern design sensibilities</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-600">Affordable luxury for the modern Indian woman</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                <p className="text-sm sm:text-base text-gray-600">Nationwide delivery with excellent customer service</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
            Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Values</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    {value.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ready to Explore Our Collection?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Discover our latest arrivals and find the perfect ethnic wear that reflects your style and personality.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="#shop"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 touch-manipulation text-sm sm:text-base"
              >
                Shop Now
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 touch-manipulation text-sm sm:text-base"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
