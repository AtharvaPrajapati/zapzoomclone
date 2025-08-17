import { useState } from 'react'
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react'
import MobileMenu from './MobileMenu'
import { useResponsive } from '../hooks/useResponsive'

const Header = ({
  cartItems,
  totalItems,
  isCartOpen,
  setIsCartOpen,
  removeFromCart,
  updateQuantity,
  getTotalPrice
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { isMobile, isTablet } = useResponsive()

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#shop' },
    { name: 'Kurtis', href: '#kurtis' },
    { name: 'Sarees', href: '#sarees' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-1 sm:py-2 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-1 sm:gap-0">
          <div className="text-center sm:text-left">
            <span className="block sm:inline">🎉 Free shipping on orders over ₹999</span>
            <span className="hidden md:inline"> | Call: +91 8090821861</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="hidden sm:block text-xs">Follow us:</span>
            <div className="flex space-x-1 sm:space-x-2">
              <a href="#" className="hover:text-purple-200 transition-colors text-xs px-1">FB</a>
              <a href="#" className="hover:text-purple-200 transition-colors text-xs px-1">IG</a>
              <a href="#" className="hover:text-purple-200 transition-colors text-xs px-1">TW</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                ZAPZOOM
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Fashion Collection</p>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 sm:p-2 text-gray-700 hover:text-purple-600 transition-colors touch-manipulation"
                aria-label="Search"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* User Account */}
              <button
                className="p-1.5 sm:p-2 text-gray-700 hover:text-purple-600 transition-colors hidden sm:block touch-manipulation"
                aria-label="User Account"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Wishlist */}
              <button
                className="p-1.5 sm:p-2 text-gray-700 hover:text-purple-600 transition-colors hidden md:block touch-manipulation"
                aria-label="Wishlist"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-1.5 sm:p-2 text-gray-700 hover:text-purple-600 transition-colors touch-manipulation"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center min-w-0">
                    <span className="text-xs leading-none">{totalItems > 99 ? '99+' : totalItems}</span>
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 text-gray-700 hover:text-purple-600 transition-colors touch-manipulation ml-1"
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

        {/* Enhanced Mobile Menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          cartItems={cartItems}
          totalItems={totalItems}
        />
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b">
                <h2 className="text-base sm:text-lg font-semibold">Cart ({totalItems})</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full touch-manipulation"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm sm:text-base">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3 border-b pb-3 sm:pb-4">
                        <img src={item.image} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-xs sm:text-sm line-clamp-2">{item.name}</h3>
                          <p className="text-purple-600 font-semibold text-sm">₹{item.price}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm touch-manipulation"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="text-sm min-w-[20px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm touch-manipulation"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 touch-manipulation"
                          aria-label="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="border-t p-3 sm:p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <span className="font-semibold text-sm sm:text-base">Total: ₹{getTotalPrice()}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 sm:py-3.5 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all touch-manipulation text-sm sm:text-base">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
