import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import MobileMenu from './MobileMenu'
import { useResponsive } from '../hooks/useResponsive'

const Header = ({
  cartItems,
  totalItems,
  removeFromCart,
  updateQuantity,
  getTotalPrice
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const { isMobile, isTablet } = useResponsive()
  const location = useLocation()
  const navigate = useNavigate()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <>
      {/* Top Bar */}
   

      {/* Main Header */}
      <header className="bg-black shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 min-w-0">
              <Link to="/" className="block">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white truncate">
                 groomy solutions
                </h1>
                <p className="text-xs text-gray-300 hidden sm:block">Fashion Collection</p>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'text-primary-200'
                      : 'text-white hover:text-primary-200'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 sm:p-2 text-white hover:text-primary-200 transition-colors touch-manipulation"
                aria-label="Search"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Authentication Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden md:flex items-center space-x-2">
                    <span className="text-sm text-white">Hi, {user?.firstName || 'User'}</span>
                    <Link
                      to="/dashboard"
                      className="p-2 text-white hover:text-primary-200 transition-colors"
                      aria-label="Dashboard"
                    >
                      <User className="h-5 w-5" />
                    </Link>
                  </div>

                  <Link
                    to="/dashboard"
                    className="md:hidden p-1.5 sm:p-2 text-white hover:text-primary-200 transition-colors touch-manipulation"
                    aria-label="User Account"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="hidden md:flex items-center space-x-2">
                    <Link
                      to="/login"
                      className="px-3 py-1.5 text-sm text-white hover:text-primary-200 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-3 py-1.5 text-sm bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>

                  <Link
                    to="/login"
                    className="md:hidden p-1.5 sm:p-2 text-white hover:text-primary-200 transition-colors touch-manipulation"
                    aria-label="Login"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </>
              )}

              {/* Wishlist */}
              <button
                className="p-1.5 sm:p-2 text-white hover:text-primary-200 transition-colors hidden md:block touch-manipulation"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-1.5 sm:p-2 text-white hover:text-primary-200 transition-colors touch-manipulation"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-secondary-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center min-w-0">
                    <span className="text-xs leading-none">{totalItems > 99 ? '99+' : totalItems}</span>
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-white hover:text-primary-200 transition-colors touch-manipulation ml-1"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t bg-gray-50 px-3 sm:px-4 py-3 sm:py-4">
            <div className="max-w-7xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for kurtis, sarees..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-8 sm:pl-10 pr-3 sm:pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  autoFocus
                />
                <Search className="absolute left-2 sm:left-3 top-2.5 sm:top-3.5 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 sm:right-3 top-2.5 sm:top-3.5 text-gray-400 hover:text-gray-600 lg:hidden"
                  aria-label="Close search"
                >
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          cartItems={cartItems}
          totalItems={totalItems}
        />
      </header>
    </>
  )
}

export default Header
