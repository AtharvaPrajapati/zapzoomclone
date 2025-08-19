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

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* ---- Sidebar (My Account) ---- */}
        {/* Account Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium text-gray-900">Email Verified</p>
                <p className="text-sm text-gray-600">Your email is confirmed</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium text-gray-900">Phone Verified</p>
                <p className="text-sm text-gray-600">Your phone is confirmed</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="font-medium text-gray-900">Profile Completion</p>
                <p className="text-sm text-gray-600">85% complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recommended</h3>
            <Link to="/shop" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                <h4 className="font-medium text-gray-900 mb-1">Product Name</h4>
                <div className="flex items-center justify-between">
                  <span className="text-primary-600 font-semibold">₹1,299</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* ---- Dashboard Content ---- */}
      <main className="flex-1 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3">
                Welcome back, {user ? user.firstName : 'User'}!
              </h2>
              <p className="text-primary-100 text-lg">
                Here's what's happening with your account today.
              </p>
            </div>
            <div className="hidden md:block">
              <TrendingUp className="h-20 w-20 text-primary-200" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Link
                key={stat.name}
                to={stat.href}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-105 border border-gray-100"
              >
                <div className="flex items-center">
                  <div className={`${stat.color} p-4 rounded-xl shadow-lg`}>
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon
              return (
                <Link
                  key={action.name}
                  to={action.href}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all"
                >
                  <div className={`inline-flex p-2 rounded-lg ${action.color} mb-3`}>
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
  )
}

export default Dashboard
