import { useState } from 'react'
import { Package, Eye, Download, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getOrders } from '../utils/localStorage'

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all')
  const { user } = useAuth()

  // Get user orders from localStorage
  const allOrders = user ? getOrders(user.id) : []

  // Mock orders data for demo (remove in production)
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 2499,
      items: [
        {
          name: 'Elegant Silk Saree',
          image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
          price: 2499,
          quantity: 1
        }
      ],
      trackingNumber: 'TRK123456789',
      deliveryAddress: 'House No. 123, Sector 45, Gurgaon, Haryana - 122001'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 1899,
      items: [
        {
          name: 'Cotton Printed Kurti',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
          price: 1899,
          quantity: 1
        }
      ],
      trackingNumber: 'TRK987654321',
      deliveryAddress: 'House No. 123, Sector 45, Gurgaon, Haryana - 122001'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-05',
      status: 'processing',
      total: 3299,
      items: [
        {
          name: 'Designer Anarkali Suit',
          image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          price: 3299,
          quantity: 1
        }
      ],
      trackingNumber: 'TRK456789123',
      deliveryAddress: 'House No. 123, Sector 45, Gurgaon, Haryana - 122001'
    }
  ]

  // Use real orders if available, otherwise show mock data for demo
  const orders = allOrders.length > 0 ? allOrders : mockOrders

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = activeTab === 'all' ? orders : orders.filter(order => order.status === activeTab)

  const tabs = [
    { id: 'all', name: 'All Orders', count: orders.length },
    { id: 'processing', name: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { id: 'shipped', name: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', name: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
            <p className="text-gray-600 mt-1">Track and manage your orders</p>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-primary-500" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Orders List */}
        <div className="p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{order.total}</p>
                      <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="w-16 h-16 flex-shrink-0 relative bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onLoad={(e) => {
                              e.target.style.opacity = '1'
                            }}
                            onError={(e) => {
                              console.log('Order image failed to load:', item.image)
                              e.target.style.display = 'none'
                              e.target.nextElementSibling.style.display = 'flex'
                            }}
                            style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 text-white items-center justify-center text-xs font-medium hidden">
                            <span className="text-center">{item.name.split(' ')[0]}</span>
                          </div>
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right w-full sm:w-auto">
                          <p className="font-medium text-gray-900">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium">
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                      {order.status === 'shipped' || order.status === 'delivered' ? (
                        <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium">
                          <Truck className="h-4 w-4" />
                          <span>Track Order</span>
                        </button>
                      ) : null}
                      {order.status === 'delivered' && (
                        <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium">
                          <Download className="h-4 w-4" />
                          <span>Download Invoice</span>
                        </button>
                      )}
                    </div>
                    {order.trackingNumber && (
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Tracking: {order.trackingNumber}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders
