import { useState } from 'react'
import { CreditCard, Shield, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { saveOrder, getUser } from '../utils/localStorage'

const RazorpayPayment = ({ product, onSuccess, onClose }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const { user } = useAuth()

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    const res = await loadRazorpayScript()
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      setIsProcessing(false)
      return
    }
    // Always create order on backend and use returned order_id
    let orderResponse
    try {
      orderResponse = await fetch('http://localhost:5000/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: product.price * 100,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: { product_id: product.id, product_name: product.name }
        })
      })
      orderResponse = await orderResponse.json()
      if (!orderResponse.order_id) throw new Error('Order creation failed')
    } catch (err) {
      alert('Failed to create order: ' + err.message)
      setIsProcessing(false)
      return
    }
    const options = {
      key: 'rzp_test_R7H4c0ZpjgDeo0', // Use your test key
      amount: orderResponse.amount,
      currency: orderResponse.currency,
      name: 'Groomy Solutions',
      description: `Payment for ${product.name}`,
      image: 'https://your-logo-url.com/logo.png',
      order_id: orderResponse.order_id, // Use backend order_id
      handler: async function (response) {
        // 1. Verify payment on backend
        try {
          const verifyRes = await fetch('http://localhost:5000/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          const verifyData = await verifyRes.json();
          if (!verifyData.success) {
            setIsProcessing(false);
            alert('Payment verification failed. Please contact support.');
            return;
          }
        } catch (err) {
          setIsProcessing(false);
          alert('Payment verification error: ' + err.message);
          return;
        }
        // 2. Save order and show success
        setPaymentSuccess(true);
        setIsProcessing(false);
        const orderData = {
          userId: user?.id || 'guest',
          items: [{ ...product, quantity: 1 }],
          total: product.price,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          paymentMethod: 'razorpay'
        };
        const savedOrder = saveOrder(orderData);
        const cartItem = {
          ...product,
          quantity: 1,
          paymentId: response.razorpay_payment_id,
          orderId: savedOrder?.id
        };
        onSuccess(cartItem, savedOrder);
      },
      prefill: {
        name: user ? `${user.firstName} ${user.lastName}` : 'Guest User',
        email: user?.email || 'guest@example.com',
        contact: user?.phone || '9999999999'
      },
      notes: { product_id: product.id, product_name: product.name },
      theme: { color: '#8B5CF6' },
      modal: {
        ondismiss: function() {
          setIsProcessing(false)
        }
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.on('payment.failed', function (response) {
      setIsProcessing(false)
      alert('Payment failed: ' + response.error.description)
    })
    paymentObject.open()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        {paymentSuccess ? (
          <div className="flex flex-col items-center justify-center h-64">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Done with Card</h2>
            <p className="text-gray-700 text-center">Thank you for your payment!</p>
            <button
              className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure Payment</h2>
              <p className="text-gray-600">Complete your purchase securely</p>
            </div>
            {/* Product Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-lg font-bold text-primary-600">₹{product.price}</p>
                </div>
              </div>
            </div>
            {/* Security Features */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">Secure Payment</h4>
                  <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
                </div>
              </div>
              <div className="mt-3 flex items-center space-x-4 text-sm text-green-700">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>
            {/* Payment Methods */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Accepted Payment Methods</h4>
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-gray-100 rounded p-2 text-center">
                  <span className="text-xs font-medium text-gray-600">Cards</span>
                </div>
                <div className="bg-gray-100 rounded p-2 text-center">
                  <span className="text-xs font-medium text-gray-600">UPI</span>
                </div>
                <div className="bg-gray-100 rounded p-2 text-center">
                  <span className="text-xs font-medium text-gray-600">Wallet</span>
                </div>
                <div className="bg-gray-100 rounded p-2 text-center">
                  <span className="text-xs font-medium text-gray-600">NetBanking</span>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Pay ₹${product.price}`
                )}
              </button>
            </div>
            {/* Test Mode Notice */}
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                <strong>Test Mode:</strong> Use test card 4111 1111 1111 1111 for testing
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default RazorpayPayment
