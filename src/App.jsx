import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import DashboardLayout from './components/DashboardLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import AccountSettings from './pages/AccountSettings'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsConditions from './pages/TermsConditions'
import ImageTest from './components/ImageTest'
import ResponsiveTest from './components/ResponsiveTest'
import { getCart, addToCart as addToCartLS, removeFromCart as removeFromCartLS, updateCartQuantity as updateCartQuantityLS, getTotalPrice, initializeDemoData } from './utils/localStorage'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Initialize cart from localStorage on mount
  useEffect(() => {
    initializeDemoData()
    setCartItems(getCart())
  }, [])

  const addToCart = (product) => {
    const updatedCart = addToCartLS(product)
    setCartItems(updatedCart)
  }

  const removeFromCart = (productId) => {
    const updatedCart = removeFromCartLS(productId)
    setCartItems(updatedCart)
  }

  const updateQuantity = (productId, quantity) => {
    const updatedCart = updateCartQuantityLS(productId, quantity)
    setCartItems(updatedCart)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPriceFunc = () => {
    return getTotalPrice(cartItems)
  }

  const refreshCart = () => {
    setCartItems(getCart())
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route
          path="/"
          element={
            <Layout
              cartItems={cartItems}
              totalItems={getTotalItems()}
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              getTotalPrice={getTotalPrice}
            />
          }
        >
          <Route
            index
            element={
              <Home
                cartItems={cartItems}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                getTotalPrice={getTotalPrice}
              />
            }
          />
          <Route
            path="shop"
            element={<Shop addToCart={addToCart} />}
          />
          <Route
            path="product/:id"
            element={
              <ProductDetail
                addToCart={addToCart}
                toggleWishlist={() => {}}
                isWishlisted={() => false}
              />
            }
          />

          <Route
            path="about"
            element={<About />}
          />
          <Route
            path="contact"
            element={<Contact />}
          />
          <Route
            path="cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                getTotalPrice={getTotalPriceFunc}
                refreshCart={refreshCart}
              />
            }
          />
        </Route>

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />

        {/* Image Test Page - Development Only */}
        <Route path="/image-test" element={<ImageTest />} />

        {/* Dashboard Routes - Protected */}
        <Route path="/dashboard" element={
            <DashboardLayout />
        }>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<AccountSettings />} />
        </Route>
        </Routes>

        {/* Responsive Test Component - Remove in production */}
        {process.env.NODE_ENV === 'development' && <ResponsiveTest />}
      </Router>
    </AuthProvider>
  )
}

export default App
