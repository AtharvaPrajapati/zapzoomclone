import { CheckCircle, Package, ArrowRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const PaymentSuccessModal = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Your order has been placed successfully</p>
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Order ID</span>
              <span className="text-sm font-bold text-gray-900">{orderDetails.id}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Amount Paid</span>
              <span className="text-sm font-bold text-green-600">₹{orderDetails.total}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Payment ID</span>
              <span className="text-xs text-gray-500">{orderDetails.paymentId}</span>
            </div>
          </div>
        )}

        {/* Order Status */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <Package className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <h4 className="font-medium text-blue-900">Order Processing</h4>
              <p className="text-sm text-blue-700">Your order is being prepared for shipment</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            to="/dashboard/orders"
            onClick={onClose}
            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-medium"
          >
            <Package className="h-5 w-5 mr-2" />
            View My Orders
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          
          <Link
            to="/shop"
            onClick={onClose}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Thank you for shopping with <span className="font-semibold text-primary-600">ZapZoom</span>!
          </p>
          <p className="text-xs text-gray-500 mt-1">
            You will receive an email confirmation shortly.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessModal
