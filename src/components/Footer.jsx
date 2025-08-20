import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const usefulLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'My Account', href: '/dashboard' },
    { name: 'Shop', href: '/shop' }
  ]

  const importantLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms and Conditions', href: '/terms-conditions' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'Shipping Info', href: '/shipping-info' }
  ]

  const categories = [
    { name: 'Kurtis', href: '/kurtis' },
    { name: 'Sarees', href: '/sarees' },
    { name: 'All Products', href: '/shop' }
  ]

  return (
    <footer className="bg-primary-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Stay Updated with Our Latest Collections</h3>
            <p className="text-sm sm:text-base text-primary-200 mb-4 sm:mb-6 max-w-2xl mx-auto px-4 sm:px-0">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and fashion tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-primary-600 text-white placeholder-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-sm sm:text-base"
              />
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-secondary-500 text-white font-semibold rounded-lg hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105 touch-manipulation text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
               groomy solutions
              </h2>
              <p className="text-sm text-primary-200">Fashion Collection</p>
            </div>
            <p className="text-sm sm:text-base text-purple-200 mb-4 sm:mb-6 leading-relaxed">
             Welcome to Groomysolutions Private Limited, your go-to destination for elegant and stylish women's Fashion! We are passionate about providing high-quality, trendy, and comfortable Kurtis and Sarees.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors touch-manipulation" aria-label="Facebook">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors touch-manipulation" aria-label="Instagram">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors touch-manipulation" aria-label="Twitter">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors touch-manipulation" aria-label="YouTube">
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-pink-300">Useful Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm sm:text-base text-purple-200 hover:text-white transition-colors duration-200 flex items-center group touch-manipulation"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-pink-300">Categories</h3>
            <ul className="space-y-2 sm:space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="text-sm sm:text-base text-purple-200 hover:text-white transition-colors duration-200 flex items-center group touch-manipulation"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-pink-300">Contact Info</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-purple-200 text-xs sm:text-sm leading-relaxed">
                        House No: 2056A,
        Housing Board Colony
      NEAR ESI DISPENSARY Sector 55
        Faridabad Haryana 121015
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 flex-shrink-0" />
                <a href="tel:+918222830653" className="text-purple-200 hover:text-white transition-colors text-sm sm:text-base touch-manipulation">
                  +918222830653
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400 flex-shrink-0" />
                <a href="amanmalhaan12@gmail.com" className="text-purple-200 hover:text-white transition-colors text-sm sm:text-base touch-manipulation break-all">
               amanmalhaan12@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Important Links */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-purple-700">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
            {importantLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs sm:text-sm text-purple-200 hover:text-white transition-colors duration-200 touch-manipulation text-center"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20 border-t border-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-purple-200 text-xs sm:text-sm text-center md:text-left">
              © 2024groomy solutions TECHNOLOGIES PRIVATE LIMITED. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
