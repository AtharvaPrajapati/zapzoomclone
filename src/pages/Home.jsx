import Hero from '../components/Hero'
import Features from '../components/Features'
import ProductGrid from '../components/ProductGrid'
import About from '../components/About'
import Testimonials from '../components/Testimonials'

const Home = ({ cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice }) => {
  return (
    <main>
      <Hero slides={[
        {
          id: 1,
          title: "Premium Ethnic Collection",
          subtitle: "Discover Timeless Elegance",
          description: "Handcrafted Sarees & Kurtis for Every Occasion",
          image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?fit=crop&w=1200&q=80",
          buttonText: "Shop Collection",
          buttonLink: "#shop",
          offer: "Up to 50% Off"
        },
        {
          id: 2,
          title: "Festive Special",
          subtitle: "Celebrate in Style",
          description: "Exclusive Designs for Festival Season",
          image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?fit=crop&w=1200&q=80",
          buttonText: "Explore Now",
          buttonLink: "#collection",
          offer: "New Arrivals"
        },
        {
          id: 3,
          title: "Bridal Collection",
          subtitle: "Your Dream Wedding Look",
          description: "Exquisite Bridal Wear for Your Special Day",
          image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=1200&q=80",
          buttonText: "View Bridal",
          buttonLink: "#bridal",
          offer: "Limited Edition"
        }
      ]} />
      <ProductGrid addToCart={addToCart} limitProducts={8} showFeaturedOnly={true} />
      <Features />
      <About />
      <Testimonials />
    </main>
  )
}

export default Home
