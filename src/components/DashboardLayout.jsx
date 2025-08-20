import { useState, useEffect } from 'react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from './Header'
import { getCart, getTotalPrice } from '../utils/localStorage'
import {
  User,
  ShoppingBag,
  LogOut,
  Menu,
  X,
  Package
} from 'lucide-react'

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Load cart from localStorage on mount
  useEffect(() => {
    setCartItems(getCart())
  }, [])

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = getTotalPrice(cartItems)

  const sidebarItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: User,
      description: 'Overview of your account'
    },
    {
      name: 'Orders',
      href: '/dashboard/orders',
      icon: Package,
      description: 'Track your orders'
    },
    {
      name: 'Account Settings',
      href: '/dashboard/settings',
      icon: User,
      description: 'Manage personal info'
    }
  ]

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:block`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-primary-500 to-primary-600">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-primary-600 font-bold text-lg">G</span>
              </div>
              <span className="font-bold text-white text-xl">groomy solutions</span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-primary-400 text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-6 border-b bg-gradient-to-b from-primary-50 to-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {user ? `${user.firstName} ${user.lastName}` : 'User'}
                </h3>
                <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mt-1">
                  Premium Member
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon
              const isActive = location.pathname === item.href

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md'
                  }`}
                >
                  <IconComponent className={`h-6 w-6 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-500'}`} />
                  <div className="flex-1">
                    <div className={`font-semibold text-lg ${isActive ? 'text-white' : 'text-gray-900'}`}>
                      {item.name}
                    </div>
                    <div className={`text-sm ${isActive ? 'text-primary-100' : 'text-gray-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-6 border-t bg-gray-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 px-4 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-md group"
            >
              <LogOut className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          cartItems={cartItems}
          totalItems={totalItems}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
        />

        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full sm:w-auto">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors self-start mb-2 sm:mb-0"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your account and preferences</p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent font-semibold rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
