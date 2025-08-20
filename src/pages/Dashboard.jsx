import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getCart } from '../utils/localStorage'
import {
  Heart,
  ShoppingBag,
  User,
  Star,
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react'

const Dashboard = () => {
  const { user } = useAuth()
  const cartItems = getCart()

  const stats = [
    {
      name: 'Cart Items',
      value: cartItems.length.toString(),
      icon: ShoppingBag,
      color: 'bg-blue-500',
      href: '/cart'
    },
    {
      name: 'Wishlist Items',
      value: '0',
      icon: Heart,
      color: 'bg-red-500',
      href: '/dashboard/wishlist'
    },
    {
      name: 'Profile',
      value: '100%',
      icon: User,
      color: 'bg-green-500',
      href: '/dashboard/settings'
    }
  ]

  const quickActions = [
    {
      name: 'Update Profile',
      description: 'Edit your account details',
      icon: User,
      href: '/dashboard/settings',
      color: 'bg-green-50 text-green-600'
    },
    {
      name: 'View Cart',
      description: 'See your cart items',
      icon: ShoppingBag,
      href: '/cart',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      name: 'View Wishlist',
      description: 'See your saved items',
      icon: Heart,
      href: '/dashboard/wishlist',
      color: 'bg-red-50 text-red-600'
    },
    {
      name: 'Shop Now',
      description: 'Browse our collection',
      icon: ShoppingBag,
      href: '/shop',
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  const recommendedProducts = [
    {
      id: 1,
      name: 'Elegant Purple Kurti',
      price: 899,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Traditional Silk Saree',
      price: 2499,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      name: 'Embroidered Cotton Kurti',
      price: 1299,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ]

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-7xl mx-auto">
      {/* ---- Sidebar (My Account) ---- */}
      <div className="col-span-1 space-y-3 sm:space-y-4">
        {/* Account Status */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Account Status</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm sm:text-base">Email Verified</p>
                <p className="text-xs sm:text-sm text-gray-600">Your email is confirmed</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm sm:text-base">Phone Verified</p>
                <p className="text-xs sm:text-sm text-gray-600">Your phone is confirmed</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm sm:text-base">Profile Completion</p>
                <p className="text-xs sm:text-sm text-gray-600">85% complete</p>
              </div>
            </div>
          </div>
        </div>
        {/* Recommended Products */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recommended</h3>
            <Link to="/shop" className="text-xs sm:text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {recommendedProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-sm transition-shadow group">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-2 sm:mb-3 overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onLoad={(e) => {
                      e.target.style.opacity = '1'
                    }}
                    onError={(e) => {
                      console.log('Image failed to load:', product.image)
                      e.target.style.display = 'none'
                      e.target.nextElementSibling.style.display = 'flex'
                    }}
                    style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 text-white items-center justify-center text-sm font-medium hidden">
                    <span className="text-center px-2">{product.name}</span>
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base line-clamp-2">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-primary-600 font-semibold text-sm sm:text-base">₹{product.price}</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* ---- Dashboard Content ---- */}
      <main className="col-span-1 lg:col-span-2 space-y-3 sm:space-y-4 w-full">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">
                Welcome back, {user ? user.firstName : 'User'}!
              </h2>
              <p className="text-primary-100 text-base md:text-lg">
                Here's what's happening with your account today.
              </p>
            </div>
            <div className="hidden md:block">
              <TrendingUp className="h-16 w-16 md:h-20 md:w-20 text-primary-200" />
            </div>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Link
                key={stat.name}
                to={stat.href}
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-gray-100"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-xl shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon
              return (
                <Link
                  key={action.name}
                  to={action.href}
                  className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all"
                >
                  <div className={`inline-flex p-2 rounded-lg ${action.color} mb-2`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{action.name}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}

export default Dashboard
