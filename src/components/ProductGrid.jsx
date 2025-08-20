import { useState } from 'react'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import QuickView from './QuickView'
import ProductCard from './ProductCard'
import { useResponsive } from '../hooks/useResponsive'

const ProductGrid = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [wishlist, setWishlist] = useState([])
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const { isMobile, isTablet } = useResponsive()

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'kurtis', name: 'Kurtis' },
    { id: 'sarees', name: 'Sarees' },
    { id: 'dupatta', name: 'Dupatta' },
    { id: 'blouse', name: 'Blouse' }
  ]

  const products = [
    {
      id: 1,
      name: "Elegant Purple Kurti",
      category: "kurtis",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      reviews: 128,
      isHot: true
    },
    {
      id: 2,
      name: "Traditional Silk Saree",
      category: "sarees",
      price: 2499,
      originalPrice: 3999,
      discount: 38,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviews: 89,
      isHot: false
    },
 
    {
      id: 4,
      name: "Designer Georgette Saree",
      category: "sarees",
      price: 1899,
      originalPrice: 2799,
      discount: 32,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      reviews: 203,
      isHot: false
    },
    {
      id: 5,
      name: "Chanderi Dupatta",
      category: "dupatta",
      price: 299,
      originalPrice: 499,
      discount: 40,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.2,
      reviews: 67,
      isHot: true
    },
    {
      id: 6,
      name: "Silk Embroidered Blouse",
      category: "blouse",
      price: 799,
      originalPrice: 1199,
      discount: 33,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.4,
      reviews: 94,
      isHot: false
    },
    {
      id: 7,
      name: "Floral Print Kurti",
      category: "kurtis",
      price: 549,
      originalPrice: 799,
      discount: 31,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.1,
      reviews: 112,
      isHot: true
    },
    {
      id: 8,
      name: "Banarasi Silk Saree",
      category: "sarees",
      price: 3299,
      originalPrice: 4999,
      discount: 34,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviews: 78,
      isHot: false
    }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const openQuickView = (product) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const closeQuickView = () => {
    setIsQuickViewOpen(false)
    setQuickViewProduct(null)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section id="shop" className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Featured <span className="text-primary-500">Products</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Discover our handpicked selection of elegant ethnic wear designed for the modern woman
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-12 px-2 sm:px-0">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 lg:px-6 py-2 rounded-full font-medium transition-all duration-300 text-sm sm:text-base touch-manipulation ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${
          isMobile
            ? 'grid-cols-2'
            : isTablet
            ? 'grid-cols-3'
            : 'grid-cols-4'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              openQuickView={openQuickView}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>

        {/* Load More Button */}
     
      </div>

      {/* Quick View Modal */}
      <QuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
        addToCart={addToCart}
      />
    </section>
  )
}

export default ProductGrid
