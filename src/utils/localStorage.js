// Local Storage Utilities for ZapZoom E-commerce

// Cart Management
export const getCart = () => {
  try {
    const cart = localStorage.getItem('zapzoom_cart')
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error('Error getting cart:', error)
    return []
  }
}

export const saveCart = (cartItems) => {
  try {
    localStorage.setItem('zapzoom_cart', JSON.stringify(cartItems))
  } catch (error) {
    console.error('Error saving cart:', error)
  }
}

export const addToCart = (product, quantity = 1) => {
  const cart = getCart()
  const existingItem = cart.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({ ...product, quantity })
  }
  
  saveCart(cart)
  return cart
}

export const removeFromCart = (productId) => {
  const cart = getCart()
  const updatedCart = cart.filter(item => item.id !== productId)
  saveCart(updatedCart)
  return updatedCart
}

export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart()
  const item = cart.find(item => item.id === productId)
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId)
    }
    item.quantity = quantity
    saveCart(cart)
  }
  
  return cart
}

export const clearCart = () => {
  localStorage.removeItem('zapzoom_cart')
  return []
}

// Orders Management
export const getOrders = (userId = null) => {
  try {
    const orders = localStorage.getItem('zapzoom_orders')
    const allOrders = orders ? JSON.parse(orders) : []
    
    if (userId) {
      return allOrders.filter(order => order.userId === userId)
    }
    
    return allOrders
  } catch (error) {
    console.error('Error getting orders:', error)
    return []
  }
}

export const saveOrder = (orderData) => {
  try {
    const orders = getOrders()
    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'processing'
    }
    
    orders.push(newOrder)
    localStorage.setItem('zapzoom_orders', JSON.stringify(orders))
    return newOrder
  } catch (error) {
    console.error('Error saving order:', error)
    return null
  }
}

export const updateOrderStatus = (orderId, status) => {
  try {
    const orders = getOrders()
    const order = orders.find(o => o.id === orderId)
    
    if (order) {
      order.status = status
      order.updatedAt = new Date().toISOString()
      localStorage.setItem('zapzoom_orders', JSON.stringify(orders))
    }
    
    return order
  } catch (error) {
    console.error('Error updating order status:', error)
    return null
  }
}

// User Management
export const getUser = () => {
  try {
    const user = localStorage.getItem('zapzoom_user')
    return user ? JSON.parse(user) : null
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export const saveUser = (userData) => {
  try {
    localStorage.setItem('zapzoom_user', JSON.stringify(userData))
  } catch (error) {
    console.error('Error saving user:', error)
  }
}

export const removeUser = () => {
  localStorage.removeItem('zapzoom_user')
}

// Wishlist Management
export const getWishlist = (userId) => {
  try {
    const wishlist = localStorage.getItem(`zapzoom_wishlist_${userId}`)
    return wishlist ? JSON.parse(wishlist) : []
  } catch (error) {
    console.error('Error getting wishlist:', error)
    return []
  }
}

export const addToWishlist = (userId, product) => {
  try {
    const wishlist = getWishlist(userId)
    const exists = wishlist.find(item => item.id === product.id)
    
    if (!exists) {
      wishlist.push(product)
      localStorage.setItem(`zapzoom_wishlist_${userId}`, JSON.stringify(wishlist))
    }
    
    return wishlist
  } catch (error) {
    console.error('Error adding to wishlist:', error)
    return []
  }
}

export const removeFromWishlist = (userId, productId) => {
  try {
    const wishlist = getWishlist(userId)
    const updatedWishlist = wishlist.filter(item => item.id !== productId)
    localStorage.setItem(`zapzoom_wishlist_${userId}`, JSON.stringify(updatedWishlist))
    return updatedWishlist
  } catch (error) {
    console.error('Error removing from wishlist:', error)
    return []
  }
}

// Utility functions
export const getTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const getCartItemCount = () => {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.quantity, 0)
}

// Demo data initialization
export const initializeDemoData = () => {
  // Initialize with some demo orders if none exist
  const existingOrders = getOrders()
  if (existingOrders.length === 0) {
    const demoOrders = [
      {
        id: 'ORD-DEMO-001',
        userId: 'demo-user',
        items: [
          {
            id: 1,
            name: 'Elegant Silk Saree',
            price: 2499,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
          }
        ],
        total: 2499,
        status: 'delivered',
        createdAt: '2024-01-15T10:30:00.000Z',
        paymentId: 'pay_demo_001'
      }
    ]
    localStorage.setItem('zapzoom_orders', JSON.stringify(demoOrders))
  }
}
