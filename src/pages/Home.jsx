import Hero from '../components/Hero'
import Features from '../components/Features'
import ProductGrid from '../components/ProductGrid'
import About from '../components/About'
import Testimonials from '../components/Testimonials'

const Home = ({ cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice }) => {
  return (
    <main>
      <Hero />
      <ProductGrid addToCart={addToCart} limitProducts={8} showFeaturedOnly={true} />
      <Features />
      <About />
      <Testimonials />
    </main>
  )
}

export default Home
