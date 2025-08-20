import { useState } from 'react'
import ProductGrid from '../components/ProductGrid'
import MobileFilters from '../components/MobileFilters'
import PageHeader from '../components/PageHeader'
import { useResponsive } from '../hooks/useResponsive'
import { Filter, Star, TrendingUp } from 'lucide-react'

const Shop = ({ addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('featured')
  const [selectedSize, setSelectedSize] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [showTopSelling, setShowTopSelling] = useState(false)
  const { isMobile } = useResponsive()

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'sarees', name: 'Sarees' },
    { id: 'kurtis', name: 'Kurtis' },
    { id: 'lehengas', name: 'Lehengas' },
    { id: 'suits', name: 'Suits' },
    { id: 'accessories', name: 'Accessories' }
  ]

  const sizes = [
    { id: 'all', name: 'All Sizes' },
    { id: 'xs', name: 'XS' },
    { id: 's', name: 'S' },
    { id: 'm', name: 'M' },
    { id: 'l', name: 'L' },
    { id: 'xl', name: 'XL' },
    { id: 'xxl', name: 'XXL' },
    { id: 'free', name: 'Free Size' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Shop Our Collection"
        subtitle="Discover our complete range of elegant ethnic wear designed for every occasion"
        backgroundImage="https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=1200&q=80"
      />

      {/* Top Selling Banner */}
      <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6" />
              <span className="font-semibold">Top Selling Products</span>
            </div>
            <button
              onClick={() => setShowTopSelling(!showTopSelling)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showTopSelling
                  ? 'bg-white text-secondary-600'
                  : 'bg-secondary-700 text-white hover:bg-secondary-800'
              }`}
            >
              {showTopSelling ? 'Show All' : 'View Top Selling'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {isMobile && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <MobileFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar + Products */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-6 xl:gap-8">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-primary-100 text-primary-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                          selectedSize === size.id
                            ? 'bg-primary-500 text-white border-primary-500'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-primary-300'
                        }`}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sort By</h3>
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                {/* Top Selling Toggle */}

              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              addToCart={addToCart}
              selectedCategory={selectedCategory}
              selectedSort={selectedSort}
              selectedSize={selectedSize}
              priceRange={priceRange}
              showTopSelling={showTopSelling}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
