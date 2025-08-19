import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartSidebar from './CartSidebar'

const Layout = ({ 
  cartItems, 
  totalItems, 
  isCartOpen, 
  setIsCartOpen, 
  removeFromCart, 
  updateQuantity, 
  getTotalPrice 
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Header
        cartItems={cartItems}
        totalItems={totalItems}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
      />
      
      <main>
        <Outlet />
      </main>
      
      <Footer />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
      />
    </div>
  )
}

export default Layout
