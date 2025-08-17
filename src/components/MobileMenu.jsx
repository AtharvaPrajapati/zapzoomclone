import { useState, useEffect } from 'react'
import { X, Home, ShoppingBag, User, Heart, Phone, Mail, MapPin } from 'lucide-react'

const MobileMenu = ({ isOpen, onClose, cartItems, totalItems }) => {
  const [activeSection, setActiveSection] = useState('menu')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const menuItems = [
    { name: 'Home', href: '#', icon: Home },
    { name: 'Shop', href: '#shop', icon: ShoppingBag },
    { name: 'Kurtis', href: '#kurtis', icon: ShoppingBag },
    { name: 'Sarees', href: '#sarees', icon: ShoppingBag },
    { name: 'About Us', href: '#about', icon: User },
    { name: 'Contact', href: '#contact', icon: Phone }
  ]

  const quickActions = [
    { name: 'My Account', icon: User, action: () => {} },
    { name: 'Wishlist', icon: Heart, action: () => {} },
    { name: 'Track Order', icon: MapPin, action: () => {} }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-pink-600">
            <div>
              <h2 className="text-xl font-bold text-white">ZAPZOOM</h2>
              <p className="text-xs text-purple-100">Fashion Collection</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveSection('menu')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeSection === 'menu'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => setActiveSection('cart')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
                activeSection === 'cart'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeSection === 'menu' ? (
              <div className="p-4">
                {/* Main Navigation */}
                <div className="space-y-2 mb-6">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group"
                      >
                        <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                        <span className="font-medium text-gray-700 group-hover:text-purple-600">
                          {item.name}
                        </span>
                      </a>
                    )
                  })}
                </div>

                {/* Quick Actions */}
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    {quickActions.map((action) => {
                      const IconComponent = action.icon
                      return (
                        <button
                          key={action.name}
                          onClick={action.action}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group w-full text-left"
                        >
                          <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                          <span className="font-medium text-gray-600 group-hover:text-gray-800">
                            {action.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t pt-4 mt-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Contact Us
                  </h3>
                  <div className="space-y-3">
                    <a href="tel:+918090821861" className="flex items-center space-x-3 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>+91 8090821861</span>
                    </a>
                    <a href="mailto:zapzoom413@gmail.com" className="flex items-center space-x-3 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>zapzoom413@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <button
                      onClick={onClose}
                      className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 border-b pb-4">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          <p className="text-purple-600 font-semibold text-sm">₹{item.price}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold">
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
