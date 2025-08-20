import { useState } from 'react'
import { Heart, ShoppingCart, Eye, Star, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useResponsive } from '../hooks/useResponsive'
import RazorpayPayment from './RazorpayPayment'
import LoginModal from './LoginModal'
import PaymentSuccessModal from './PaymentSuccessModal'

const ProductCard = ({
  product,
  addToCart,
  toggleWishlist,
  openQuickView,
  isWishlisted
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const { isMobile, isTablet } = useResponsive()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handlePaymentSuccess = (cartItem, order) => {
    addToCart(cartItem)
    setShowPayment(false)
    setOrderDetails(order)
    setShowSuccessModal(true)
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true)
      return
    }
    setShowPayment(true)
  }

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
    setShowPayment(true)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    openQuickView(product)
  }

  return (
    <div className="group bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 relative">
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-square">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1 sm:gap-2 z-10">
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              -{product.discount}%
            </span>
          )}
          {product.isHot && (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              HOT
            </span>
          )}
        </div>

        {/* Mobile Action Buttons - Always Visible */}
        {isMobile && (
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
                isWishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-600 hover:text-red-500'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className="h-3 w-3" />
            </button>
            <button 
              onClick={handleQuickView}
              className="p-2 bg-white/90 text-gray-600 hover:text-purple-600 rounded-full shadow-lg transition-all duration-300"
              aria-label="Quick view"
            >
              <Eye className="h-3 w-3" />
            </button>
          </div>
        )}

        {/* Desktop Action Buttons - Hover to Show */}
        {!isMobile && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleToggleWishlist}
              className={`p-1.5 sm:p-2 rounded-full shadow-lg transition-all duration-300 ${
                isWishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 hover:text-red-500'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={handleQuickView}
              className="p-1.5 sm:p-2 bg-white text-gray-600 hover:text-primary-600 rounded-full shadow-lg transition-all duration-300"
              aria-label="Quick view"
            >
              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        )}

        {/* Mobile Action Buttons - Always Visible */}
        {isMobile && (
          <div className="absolute bottom-2 left-2 right-2 flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-1 text-xs"
            >
              <ShoppingCart className="h-3 w-3" />
              Add
            </button>
          </div>
        )}

        {/* Desktop Action Buttons - Hover to Show */}
        {!isMobile && (
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-600 text-white py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </button>
            
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 text-sm sm:text-base leading-tight">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs sm:text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="text-base sm:text-lg font-bold text-primary-600">
            ₹{product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>

        {/* Mobile Quick Actions */}
        {isMobile && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary-500 text-white py-2 rounded-lg font-medium text-xs flex items-center justify-center gap-1"
            >
              <ShoppingCart className="h-3 w-3" />
              Add to Cart
            </button>
            <button
              onClick={handleQuickView}
              className="px-3 py-2 border border-primary-600 text-primary-600 rounded-lg font-medium text-xs hover:bg-primary-50"
            >
              View
            </button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Payment Modal */}
      {showPayment && (
        <RazorpayPayment
          product={product}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}

      {/* Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        orderDetails={orderDetails}
      />
    </div>
  )
}

export default ProductCard
