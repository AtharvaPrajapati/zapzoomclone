import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      comment: "Absolutely love the quality of kurtis fromgroomy solutions! The fabric is so soft and the designs are stunning. I've ordered multiple times and never been disappointed.",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?fit=crop&w=150&q=80",
      product: "Embroidered Cotton Kurti"
    },
    {
      id: 2,
      name: "Anita Patel",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      comment: "The sarees are gorgeous! Perfect for festivals and special occasions. The delivery was quick and packaging was excellent. Highly recommended!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      product: "Traditional Silk Saree"
    },
    {
      id: 3,
      name: "Meera Reddy",
      location: "Hyderabad, Telangana",
      rating: 5,
      comment: "Great collection and affordable prices! The customer service is also very helpful. I found exactly what I was looking for my sister's wedding.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      product: "Designer Georgette Saree"
    },
    {
      id: 4,
      name: "Kavya Singh",
      location: "Delhi, NCR",
      rating: 5,
      comment: "ZapZoom has become my go-to place for ethnic wear. The variety is amazing and the quality is consistently good. Love shopping here!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      product: "Floral Print Kurti"
    },
    {
      id: 5,
      name: "Ritu Agarwal",
      location: "Jaipur, Rajasthan",
      rating: 5,
      comment: "Excellent quality products at reasonable prices. The return policy is also very customer-friendly. Will definitely shop again!",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      product: "Banarasi Silk Saree"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 border border-white rounded-full"></div>
        <div className="absolute top-20 right-10 sm:top-32 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-10 left-20 sm:bottom-20 sm:left-32 w-8 h-8 sm:w-12 sm:h-12 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-5 sm:bottom-32 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 border border-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            What Our <span className="text-pink-300">Customers Say</span>
          </h2>
          <p className="text-base sm:text-lg text-purple-200 max-w-2xl mx-auto px-4 sm:px-0">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/20">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 lg:gap-8">
              {/* Customer Image */}
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white/30"
                />
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center md:text-left">
                <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-pink-300 mb-3 sm:mb-4 mx-auto md:mx-0" />
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-4 sm:mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].comment}"
                </p>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-sm sm:text-base text-purple-200">
                      {testimonials[currentTestimonial].location}
                    </p>
                    <p className="text-xs sm:text-sm text-pink-300 mt-1">
                      Purchased: {testimonials[currentTestimonial].product}
                    </p>
                  </div>

                  <div className="flex justify-center md:justify-start">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm touch-manipulation"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm touch-manipulation"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                  index === currentTestimonial
                    ? 'bg-pink-300 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Customer Avatars */}
        <div className="flex justify-center mt-8 sm:mt-12 space-x-2 sm:space-x-4 overflow-x-auto pb-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 transition-all duration-300 flex-shrink-0 touch-manipulation ${
                index === currentTestimonial
                  ? 'border-pink-300 scale-110'
                  : 'border-white/30 hover:border-white/50'
              }`}
              aria-label={`View testimonial from ${testimonial.name}`}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
