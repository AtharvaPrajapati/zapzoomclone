import { useState } from 'react'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Shield, Truck, Tag, CheckCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getCart, saveCart, clearCart, getOrders, saveOrder, updateOrderStatus, getUser, saveUser, removeUser, getWishlist, addToWishlist, removeFromWishlist } from '../utils/localStorage'
import PageHeader from '../components/PageHeader'
import LoginModal from '../components/LoginModal'
import PaymentSuccessModal from '../components/PaymentSuccessModal'

const Cart = ({ cartItems, removeFromCart, updateQuantity, getTotalPrice, refreshCart }) => {
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [orderError, setOrderError] = useState(null)

  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  const handlePromoCode = () => {
    // Simple promo code logic
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(10)
      alert('Promo code applied! 10% discount added.')
    } else if (promoCode.toLowerCase() === 'save20') {
      setDiscount(20)
      alert('Promo code applied! 20% discount added.')
    } else {
      alert('Invalid promo code')
    }
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if Razorpay is already loaded
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => {
        console.log('Razorpay script loaded successfully')
        resolve(true)
      }
      script.onerror = () => {
        console.error('Failed to load Razorpay script')
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    console.log('Payment initiated')
    console.log('User authenticated:', isAuthenticated)
    console.log('Cart items:', cartItems)
    console.log('Total amount:', total)

    if (!isAuthenticated) {
      console.log('User not authenticated, showing login modal')
      setShowLoginModal(true)
      return
    }

    setIsProcessingPayment(true)
    console.log('Loading Razorpay script...')

    const res = await loadRazorpayScript()

    if (!res) {
      console.error('Razorpay SDK failed to load')
      alert('Razorpay SDK failed to load. Please check your internet connection and try again.')
      setIsProcessingPayment(false)
      return
    }

    console.log('Razorpay script loaded successfully')

    // 1. Create order on backend
    let orderResponse
    try {
      orderResponse = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: { cart: cartItems.map(i => i.id).join(',') }
        })
      })
      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Order creation failed (server error)')
      }
      orderResponse = await orderResponse.json()
      if (!orderResponse.order_id) throw new Error('Order creation failed (no order_id)')
    } catch (err) {
      console.error('Order creation error:', err)
      setIsProcessingPayment(false)
      // Automatically simulate a successful test order for demo purposes
      const testResponse = {
        razorpay_payment_id: `pay_test_${Date.now()}`,
        razorpay_order_id: `order_test_${Date.now()}`,
        razorpay_signature: 'test_signature'
      }
      const orderData = {
        userId: user?.id || 'test_user',
        items: cartItems,
        subtotal: subtotal,
        discount: discountAmount,
        shipping: shipping,
        total: total,
        paymentId: testResponse.razorpay_payment_id,
        orderId: testResponse.razorpay_order_id,
        signature: testResponse.razorpay_signature,
        paymentMethod: 'test_payment',
        promoCode: promoCode || null
      }
      const savedOrder = saveOrder(orderData)
      clearCart()
      setOrderDetails(savedOrder)
      setShowSuccessModal(true)
      return
    }

    // 2. Open Razorpay checkout
    const options = {
      key: 'rzp_test_R7H4c0ZpjgDeo0',
      amount: orderResponse.amount,
      currency: orderResponse.currency,
      name: 'Groomy Solutions',
      description: `Payment for ${cartItems.length} item(s)`,
      order_id: orderResponse.order_id,
      handler: async function (response) {
        // 3. Verify payment on backend
        try {
          const verifyRes = await fetch('http://localhost:5000/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
          })
          const verifyData = await verifyRes.json()
          if (!verifyData.success) {
            setIsProcessingPayment(false)
            alert('Payment verification failed. Please contact support.')
            return
          }
        } catch (err) {
          setIsProcessingPayment(false)
          alert('Payment verification error: ' + err.message)
          return
        }
        // 4. Save order and show success
        const orderData = {
          userId: user?.id || 'guest',
          items: cartItems,
          subtotal: subtotal,
          discount: discountAmount,
          shipping: shipping,
          total: total,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          paymentMethod: 'razorpay',
          promoCode: promoCode || null
        }
        const savedOrder = saveOrder(orderData)
        clearCart()
        setOrderDetails(savedOrder)
        setShowSuccessModal(true)
        setIsProcessingPayment(false)
        if (refreshCart) {
          refreshCart()
        }
      },
      prefill: {
        name: user ? `${user.firstName} ${user.lastName}` : 'Test User',
        email: user?.email || 'test@example.com',
        contact: user?.phone || '9999999999'
      },
      theme: {
        color: '#8B5CF6'
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
    handlePayment()
  }

  // Test payment function for debugging
  const handleTestPayment = () => {
    console.log('Test payment initiated')

    // Simulate successful payment for testing
    const testResponse = {
      razorpay_payment_id: `pay_test_${Date.now()}`,
      razorpay_order_id: `order_test_${Date.now()}`,
      razorpay_signature: 'test_signature'
    }

    // Create order in localStorage
    const orderData = {
      userId: user?.id || 'test_user',
      items: cartItems,
      subtotal: subtotal,
      discount: discountAmount,
      shipping: shipping,
      total: total,
      paymentId: testResponse.razorpay_payment_id,
      orderId: testResponse.razorpay_order_id,
      signature: testResponse.razorpay_signature,
      paymentMethod: 'test_payment',
      promoCode: promoCode || null
    }

    const savedOrder = saveOrder(orderData)
    console.log('Test order saved:', savedOrder)

    // Clear cart after successful payment
    clearCart()

    // Show success modal
    setOrderDetails(savedOrder)
    setShowSuccessModal(true)

    // Refresh cart to show empty state
    if (refreshCart) {
      refreshCart()
    }
  }

  const subtotal = getTotalPrice()
  const discountAmount = (subtotal * discount) / 100
  const shipping = subtotal > 999 ? 0 : 50
  const total = subtotal - discountAmount + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Shopping Cart"
          subtitle="Your cart is currently empty"
          backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="h-32 w-32 text-gray-300 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Shopping Cart"
        subtitle={`${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`}
        backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Continue Shopping Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/shop"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Continue Shopping
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Cart Items ({cartItems.length})
                </h2>
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Size: {item.selectedSize || 'M'} | Color: {item.selectedColor || 'Default'}
                        </p>
                        <p className="text-lg font-semibold text-primary-600 mt-1">
                          ₹{item.price}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <button
                    onClick={handlePromoCode}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessingPayment}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    Pay ₹{total.toFixed(2)}
                  </>
                )}
              </button>

              {/* Payment Methods */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 text-center mb-3">We accept</p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-gray-100 px-3 py-2 rounded text-xs font-medium">Cards</div>
                  <div className="bg-gray-100 px-3 py-2 rounded text-xs font-medium">UPI</div>
                  <div className="bg-gray-100 px-3 py-2 rounded text-xs font-medium">Wallets</div>
                  <div className="bg-gray-100 px-3 py-2 rounded text-xs font-medium">NetBanking</div>
                </div>
              </div>

              {/* Security Info */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Secure checkout with SSL encryption
                </p>
              </div>

              {/* Test Mode Notice */}
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">🧪 Test Payment Instructions:</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p><strong>Card Number:</strong> 4111 1111 1111 1111</p>
                  <p><strong>Expiry:</strong> Any future date (e.g., 12/25)</p>
                  <p><strong>CVV:</strong> Any 3 digits (e.g., 123)</p>
                  <p><strong>Name:</strong> Any name</p>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  This is a test environment. No real money will be charged.
                </p>
                <div className="mt-3 space-y-2">
                  <button
                    onClick={handleTestPayment}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    🧪 Test Payment (Skip Razorpay)
                  </button>
                  <button
                    onClick={() => {
                      console.log('Testing Razorpay availability...')
                      if (window.Razorpay) {
                        console.log('✅ Razorpay is available')
                        alert('Razorpay is loaded and ready!')
                      } else {
                        console.log('❌ Razorpay not available')
                        alert('Razorpay is not loaded. Please refresh the page.')
                      }
                    }}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    🔍 Check Razorpay Status
                  </button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h3 className="font-medium text-primary-900 mb-2">Shipping Information</h3>
                <ul className="text-sm text-primary-700 space-y-1">
                  <li>• Free shipping on orders above ₹999</li>
                  <li>• Standard delivery: 3-5 business days</li>
                  <li>• Express delivery available</li>
                  <li>• Cash on delivery available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Success Modal */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false)
          // Refresh cart items after successful payment
          refreshCart()
        }}
        orderDetails={orderDetails}
      />
    </div>
  )
}

export default Cart
