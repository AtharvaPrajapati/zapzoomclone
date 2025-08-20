import { useState } from 'react'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import QuickView from './QuickView'
import ProductCard from './ProductCard'

const ProductGrid = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [wishlist, setWishlist] = useState([])
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  // Responsive grid handled by CSS classes

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'kurtis', name: 'Kurtis' },
    { id: 'sarees', name: 'Sarees' },
    { id: 'lehengas', name: 'Lehengas' },
    { id: 'suits', name: 'Suits' },
    { id: 'dupatta', name: 'Dupatta' },
    { id: 'blouse', name: 'Blouse' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'tops', name: 'Tops' }
  ]
  const products = [
  {
    id: 1,
    name: "Elegant Purple Kurti",
    category: "kurtis",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    image: "data:image/jpeg;base64,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",
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
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 89,
    isHot: false
  },
  {
    id: 3,
    name: "Embroidered Cotton Kurti",
    category: "kurtis",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    reviews: 156,
    isHot: true
  },
  {
    id: 4,
    name: "Designer Georgette Saree",
    category: "sarees",
    price: 1899,
    originalPrice: 2799,
    discount: 32,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1606913084603-3e7702b01627?auto=format&fit=crop&w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1594736797933-d0301ba5ff65?auto=format&fit=crop&w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1606913123533-8c8d3dee1b4e?auto=format&fit=crop&w=500&q=80",
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
    image: "https://images.unsplash.com/photo-1610030469847-1e3d6077da91?auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviews: 78,
    isHot: false
  },
  {
    id: 9,
    name: "Festive Lehenga Set",
    category: "lehengas",
    price: 3999,
    originalPrice: 5999,
    discount: 33,
    image: "data:image/jpeg;base64,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",
    rating: 4.7,
    reviews: 45,
    isHot: true
  },
  {
    id: 10,
    name: "Casual Cotton Kurti",
    category: "kurtis",
    price: 699,
    originalPrice: 999,
    discount: 30,
    image: "https://img.theloom.in/blog/wp-content/uploads/2023/09/14-03-23-918-e1695289116121.png",
    rating: 4.1,
    reviews: 203,
    isHot: false
  },
  {
    id: 11,
    name: "Wedding Silk Saree",
    category: "sarees",
    price: 4299,
    originalPrice: 6499,
    discount: 34,
    image: "https://images.unsplash.com/photo-1610030469847-1e3d6077da91?auto=format&fit=crop&w=500&q=80",
    rating: 4.8,
    reviews: 56,
    isHot: true
  },
  {
    id: 12,
    name: "Designer Party Kurti",
    category: "kurtis",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    image: "https://images.unsplash.com/photo-1594736797933-d0301ba5ff65?auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    reviews: 87,
    isHot: false
  },
  {
    id: 13,
    name: "Net Embroidered Dupatta",
    category: "dupatta",
    price: 399,
    originalPrice: 699,
    discount: 43,
    image: "https://images.unsplash.com/photo-1606913084603-3e7702b01627?auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    reviews: 73,
    isHot: true
  },
  {
    id: 14,
    name: "Velvet Embroidered Blouse",
    category: "blouse",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    image: "https://images.unsplash.com/photo-1583391733879-d0151d94e1db?auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 102,
    isHot: false
  },
  {
    id: 15,
    name: "Bridal Lehenga Choli",
    category: "lehengas",
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    image: "https://images.unsplash.com/photo-1606913123533-8c8d3dee1b4e?auto=format&fit=crop&w=500&q=80",
    rating: 4.9,
    reviews: 34,
    isHot: true
  },
  {
    id: 16,
    name: "Printed Chiffon Saree",
    category: "sarees",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80",
    rating: 4.2,
    reviews: 145,
    isHot: false
  },
  {
    id: 17,
    name: "Handloom Cotton Kurti",
    category: "kurtis",
    price: 799,
    originalPrice: 1149,
    discount: 30,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    reviews: 98,
    isHot: true
  },
  {
    id: 18,
    name: "Organza Designer Dupatta",
    category: "dupatta",
    price: 599,
    originalPrice: 899,
    discount: 33,
    image: "https://images.unsplash.com/photo-1606913084603-3e7702b01627?auto=format&fit=crop&w=500&q=80",
    rating: 4.5,
    reviews: 61,
    isHot: false
  },
  {
    id: 19,
    name: "Mirror Work Blouse",
    category: "blouse",
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    image: "https://images.unsplash.com/photo-1594736797933-d0301ba5ff65?auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    reviews: 76,
    isHot: true
  },
  {
    id: 20,
    name: "Sangam Silk Saree",
    category: "sarees",
    price: 1799,
    originalPrice: 2599,
    discount: 31,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 124,
    isHot: false
  }
];
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
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
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