import { useState, useEffect } from 'react'
import { X, Star, Heart, ShoppingCart, Plus, Minus } from 'lucide-react'
import { useResponsive } from '../hooks/useResponsive'

const QuickView = ({ product, isOpen, onClose, addToCart }) => {
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Default')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { isMobile, isTablet } = useResponsive()

  // Prevent body scroll when modal is open
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

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = ['Default', 'Blue', 'Red', 'Green', 'Pink']

  if (!isOpen || !product) return null

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity
    })
    onClose()
  }

  // Mobile swipe to close
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isDownSwipe = distance < -100 // Swipe down to close

    if (isDownSwipe && isMobile) {
      onClose()
    }
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`absolute inset-0 flex ${isMobile ? 'items-end' : 'items-center justify-center'} p-2 sm:p-4`}>
        <div
          className={`bg-white shadow-2xl w-full overflow-y-auto ${
            isMobile
              ? 'rounded-t-2xl max-h-[90vh] min-h-[60vh]'
              : 'rounded-lg sm:rounded-2xl max-w-4xl max-h-[95vh] sm:max-h-[90vh]'
          }`}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchMove={isMobile ? handleTouchMove : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          {/* Mobile Drag Handle */}
          {isMobile && (
            <div className="flex justify-center py-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>
          )}

          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Quick View</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
              aria-label="Close"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* Product Image */}
              <div className="space-y-3 sm:space-y-4">
                <div className="aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-gray-100 border-2 border-transparent hover:border-purple-500 cursor-pointer transition-colors flex-shrink-0 touch-manipulation">
                      <img
                        src={product.image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-bold text-purple-600">
                      ₹{product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <>
                        <span className="text-lg sm:text-xl text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {product.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Product Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    This beautiful {product.category} is crafted with premium quality fabric and intricate detailing. 
                    Perfect for both casual and formal occasions, it combines traditional elegance with modern comfort. 
                    The breathable fabric ensures all-day comfort while the stunning design makes you stand out.
                  </p>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 sm:px-4 py-2 border rounded-lg font-medium transition-colors text-sm sm:text-base touch-manipulation ${
                          selectedSize === size
                            ? 'border-purple-500 bg-purple-50 text-purple-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 sm:px-4 py-2 border rounded-lg font-medium transition-colors text-sm sm:text-base touch-manipulation ${
                          selectedColor === color
                            ? 'border-purple-500 bg-purple-50 text-purple-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Quantity</h3>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={decrementQuantity}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-lg sm:text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-6">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation text-sm sm:text-base"
                  >
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-full px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation text-sm sm:text-base ${
                      isWishlisted
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-300 hover:border-red-500 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                    <span className="sm:hidden">{isWishlisted ? 'Saved' : 'Save'}</span>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">SKU:</span>
                    <span className="font-medium">ZZ{product.id.toString().padStart(4, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className="font-medium text-green-600">In Stock</span>
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

export default QuickView
