import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Minus, 
  Plus, 
  ArrowLeft,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from '../components/LoginModal'
import PaymentSuccessModal from '../components/PaymentSuccessModal'

const ProductDetail = ({ addToCart, toggleWishlist, isWishlisted }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)

  // Complete product data for all products in the shop
  const mockProducts = {
    1: {
      id: 1,
      name: 'Elegant Purple Kurti',
      price: 899,
      originalPrice: 1299,
      discount: 31,
      rating: 4.5,
      reviews: 128,
      description: 'Beautiful handcrafted purple kurti with intricate embroidery work. Perfect for festive occasions and special events. Made with premium quality fabric for comfort and style.',
      features: [
        'Premium quality cotton fabric',
        'Hand embroidered details',
        'Comfortable regular fit',
        'Machine washable',
        'Available in multiple sizes',
        'Breathable and skin-friendly'
      ],
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Purple', 'Blue', 'Green', 'Pink', 'Red'],
      inStock: true,
      category: 'Kurtis',
      brand: 'Groomy Solutions'
    },
    2: {
      id: 2,
      name: 'Traditional Silk Saree',
      price: 2499,
      originalPrice: 3999,
      discount: 38,
      rating: 4.8,
      reviews: 89,
      description: 'Exquisite traditional silk saree with beautiful motifs and elegant design. Perfect for weddings, festivals, and special occasions. Comes with matching blouse piece.',
      features: [
        'Premium silk fabric',
        'Traditional handwoven design',
        'Includes matching blouse piece',
        'Rich color and texture',
        'Perfect for special occasions',
        'Dry clean recommended'
      ],
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['Free Size'],
      colors: ['Maroon', 'Navy', 'Gold', 'Silver', 'Red'],
      inStock: true,
      category: 'Sarees',
      brand: 'Groomy Solutions'
    },
    3: {
      id: 3,
      name: 'Embroidered Cotton Kurti',
      price: 1299,
      originalPrice: 1899,
      discount: 32,
      rating: 4.3,
      reviews: 156,
      description: 'Beautiful embroidered cotton kurti with intricate threadwork. Perfect for casual and semi-formal occasions. Comfortable and stylish design.',
      features: [
        '100% pure cotton fabric',
        'Hand embroidered details',
        'Comfortable regular fit',
        'Easy to maintain',
        'Perfect for daily wear',
        'Breathable and soft'
      ],
      images: [
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Beige', 'Light Blue', 'Pink'],
      inStock: true,
      category: 'Kurtis',
      brand: 'Groomy Solutions'
    },
    4: {
      id: 4,
      name: 'Floral Print Dupatta',
      price: 599,
      originalPrice: 899,
      discount: 33,
      rating: 4.2,
      reviews: 94,
      description: 'Beautiful floral print dupatta made with soft chiffon fabric. Perfect to pair with kurtis and suits for a complete ethnic look.',
      features: [
        'Soft chiffon fabric',
        'Beautiful floral print',
        'Lightweight and comfortable',
        'Perfect for layering',
        'Easy to drape',
        'Machine washable'
      ],
      images: [
        'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['Free Size'],
      colors: ['Pink', 'Blue', 'Green', 'Yellow', 'Purple'],
      inStock: true,
      category: 'Dupatta',
      brand: 'Groomy Solutions'
    },
    5: {
      id: 5,
      name: 'Designer Blouse',
      price: 799,
      originalPrice: 1199,
      discount: 33,
      rating: 4.4,
      reviews: 67,
      description: 'Elegant designer blouse with intricate work. Perfect to pair with sarees and lehengas. Features beautiful neckline and comfortable fit.',
      features: [
        'Premium fabric blend',
        'Designer neckline',
        'Comfortable fit',
        'Perfect for sarees',
        'Elegant design',
        'Available in multiple sizes'
      ],
      images: [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Gold', 'Silver', 'Red', 'Blue', 'Black'],
      inStock: true,
      category: 'Blouse',
      brand: 'Groomy Solutions'
    },
    6: {
      id: 6,
      name: 'Festive Lehenga Set',
      price: 3999,
      originalPrice: 5999,
      discount: 33,
      rating: 4.7,
      reviews: 45,
      description: 'Stunning festive lehenga set with heavy embroidery work. Perfect for weddings and special celebrations. Includes lehenga, choli, and dupatta.',
      features: [
        'Heavy embroidery work',
        'Premium fabric quality',
        'Complete 3-piece set',
        'Perfect for weddings',
        'Elegant design',
        'Comfortable fit'
      ],
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Red', 'Pink', 'Blue', 'Green', 'Purple'],
      inStock: true,
      category: 'Lehengas',
      brand: 'Groomy Solutions'
    },
    7: {
      id: 7,
      name: 'Casual Cotton Kurti',
      price: 699,
      originalPrice: 999,
      discount: 30,
      rating: 4.1,
      reviews: 203,
      description: 'Comfortable casual cotton kurti perfect for everyday wear. Simple yet elegant design with soft fabric for all-day comfort.',
      features: [
        '100% cotton fabric',
        'Casual comfortable fit',
        'Easy to maintain',
        'Perfect for daily wear',
        'Soft and breathable',
        'Machine washable'
      ],
      images: [
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Navy', 'Grey', 'Beige'],
      inStock: true,
      category: 'Kurtis',
      brand: 'Groomy Solutions'
    },
    8: {
      id: 8,
      name: 'Printed Palazzo Pants',
      price: 899,
      originalPrice: 1299,
      discount: 31,
      rating: 4.3,
      reviews: 178,
      description: 'Stylish printed palazzo pants with comfortable elastic waistband. Perfect to pair with kurtis and tops for a complete ethnic look.',
      features: [
        'Comfortable elastic waistband',
        'Beautiful print design',
        'Flowy palazzo style',
        'Perfect for pairing',
        'Breathable fabric',
        'Easy to wear'
      ],
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Pink', 'Green', 'Yellow', 'Purple'],
      inStock: true,
      category: 'Bottoms',
      brand: 'Groomy Solutions'
    },
    9: {
      id: 9,
      name: 'Silk Anarkali Suit',
      price: 2799,
      originalPrice: 3999,
      discount: 30,
      rating: 4.6,
      reviews: 87,
      description: 'Elegant silk Anarkali suit with beautiful embroidery work. Perfect for weddings and festive occasions. Includes kurta, palazzo, and dupatta.',
      features: [
        'Premium silk fabric',
        'Beautiful embroidery work',
        'Complete 3-piece set',
        'Perfect for festivals',
        'Comfortable fit',
        'Elegant Anarkali style'
      ],
      images: [
        'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Pink', 'Blue', 'Green', 'Purple', 'Red'],
      inStock: true,
      category: 'Suits',
      brand: 'Groomy Solutions'
    },
    10: {
      id: 10,
      name: 'Ethnic Jewelry Set',
      price: 1299,
      originalPrice: 1999,
      discount: 35,
      rating: 4.4,
      reviews: 156,
      description: 'Beautiful ethnic jewelry set with traditional design. Includes necklace, earrings, and maang tikka. Perfect complement to ethnic wear.',
      features: [
        'Traditional design',
        'Complete jewelry set',
        'High-quality materials',
        'Perfect for ethnic wear',
        'Elegant finish',
        'Comes with storage box'
      ],
      images: [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['Free Size'],
      colors: ['Gold', 'Silver', 'Rose Gold', 'Antique'],
      inStock: true,
      category: 'Accessories',
      brand: 'Groomy Solutions'
    },
    11: {
      id: 11,
      name: 'Printed Palazzo Pants',
      price: 899,
      originalPrice: 1299,
      discount: 31,
      rating: 4.3,
      reviews: 178,
      description: 'Stylish printed palazzo pants with comfortable elastic waistband. Perfect to pair with kurtis and tops for a complete ethnic look.',
      features: [
        'Comfortable elastic waistband',
        'Beautiful print design',
        'Flowy palazzo style',
        'Perfect for pairing',
        'Breathable fabric',
        'Easy to wear'
      ],
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Pink', 'Green', 'Yellow', 'Purple'],
      inStock: true,
      category: 'Bottoms',
      brand: 'Groomy Solutions'
    },
    12: {
      id: 12,
      name: 'Silk Anarkali Suit',
      price: 2799,
      originalPrice: 3999,
      discount: 30,
      rating: 4.6,
      reviews: 87,
      description: 'Elegant silk Anarkali suit with beautiful embroidery work. Perfect for weddings and festive occasions. Includes kurta, palazzo, and dupatta.',
      features: [
        'Premium silk fabric',
        'Beautiful embroidery work',
        'Complete 3-piece set',
        'Perfect for festivals',
        'Comfortable fit',
        'Elegant Anarkali style'
      ],
      images: [
        'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Pink', 'Blue', 'Green', 'Purple', 'Red'],
      inStock: true,
      category: 'Suits',
      brand: 'Groomy Solutions'
    },
    13: {
      id: 13,
      name: 'Designer Crop Top',
      price: 599,
      originalPrice: 899,
      discount: 33,
      rating: 4.2,
      reviews: 134,
      description: 'Trendy designer crop top with modern styling. Perfect for casual outings and can be paired with high-waisted bottoms.',
      features: [
        'Modern trendy design',
        'Comfortable fit',
        'Versatile styling',
        'Quality fabric',
        'Perfect for casual wear',
        'Easy to maintain'
      ],
      images: [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Red', 'Blue', 'Pink'],
      inStock: true,
      category: 'Tops',
      brand: 'Groomy Solutions'
    },
    14: {
      id: 14,
      name: 'Cotton Straight Pants',
      price: 799,
      originalPrice: 1199,
      discount: 33,
      rating: 4.4,
      reviews: 156,
      description: 'Comfortable cotton straight pants perfect for casual and office wear. Made with premium cotton fabric for all-day comfort.',
      features: [
        'Premium cotton fabric',
        'Straight fit design',
        'Comfortable for daily wear',
        'Perfect for office wear',
        'Easy to maintain',
        'Available in multiple colors'
      ],
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Grey', 'Beige', 'White'],
      inStock: true,
      category: 'Bottoms',
      brand: 'Groomy Solutions'
    },
    15: {
      id: 15,
      name: 'Handwoven Cotton Saree',
      price: 1899,
      originalPrice: 2799,
      discount: 32,
      rating: 4.5,
      reviews: 92,
      description: 'Beautiful handwoven cotton saree with traditional patterns. Comfortable for daily wear and special occasions. Includes matching blouse piece.',
      features: [
        'Handwoven cotton fabric',
        'Traditional patterns',
        'Includes blouse piece',
        'Comfortable for daily wear',
        'Natural breathable fabric',
        'Easy to maintain'
      ],
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['Free Size'],
      colors: ['Blue', 'Green', 'Red', 'Yellow', 'Purple'],
      inStock: true,
      category: 'Sarees',
      brand: 'Groomy Solutions'
    },
    16: {
      id: 16,
      name: 'Embroidered Dupatta',
      price: 399,
      originalPrice: 599,
      discount: 33,
      rating: 4.3,
      reviews: 78,
      description: 'Elegant embroidered dupatta with intricate threadwork. Perfect to complete your ethnic outfit. Lightweight and comfortable to wear.',
      features: [
        'Intricate embroidery work',
        'Lightweight fabric',
        'Perfect for ethnic outfits',
        'Comfortable to wear',
        'Beautiful border design',
        'Easy to drape'
      ],
      images: [
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1506629905607-d405b7a30db9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['Free Size'],
      colors: ['Pink', 'Blue', 'Green', 'Yellow', 'White'],
      inStock: true,
      category: 'Dupatta',
      brand: 'Groomy Solutions'
    },
    17: {
      id: 17,
      name: 'Ethnic Sharara Set',
      price: 2299,
      originalPrice: 3299,
      discount: 30,
      rating: 4.5,
      reviews: 92,
      description: 'Beautiful ethnic sharara set with intricate embroidery. Perfect for weddings and festive occasions. Includes kurta, sharara, and dupatta.',
      features: [
        'Intricate embroidery work',
        'Complete 3-piece set',
        'Perfect for weddings',
        'Comfortable fit',
        'Premium fabric quality',
        'Traditional design'
      ],
      images: [
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Pink', 'Blue', 'Green', 'Red', 'Purple'],
      inStock: true,
      category: 'Suits',
      brand: 'Groomy Solutions'
    },
    18: {
      id: 18,
      name: 'Printed Maxi Dress',
      price: 1199,
      originalPrice: 1799,
      discount: 33,
      rating: 4.2,
      reviews: 134,
      description: 'Stylish printed maxi dress perfect for casual outings and summer wear. Comfortable and trendy design with beautiful prints.',
      features: [
        'Beautiful print design',
        'Maxi length style',
        'Comfortable for summer',
        'Trendy and stylish',
        'Easy to wear',
        'Perfect for casual outings'
      ],
      images: [
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Pink', 'Green', 'Yellow', 'Purple'],
      inStock: true,
      category: 'Tops',
      brand: 'Groomy Solutions'
    },
    19: {
      id: 19,
      name: 'Velvet Lehenga Choli',
      price: 4999,
      originalPrice: 7999,
      discount: 38,
      rating: 4.8,
      reviews: 67,
      description: 'Luxurious velvet lehenga choli with heavy embroidery work. Perfect for weddings and grand celebrations. Premium quality fabric and craftsmanship.',
      features: [
        'Premium velvet fabric',
        'Heavy embroidery work',
        'Complete 3-piece set',
        'Perfect for weddings',
        'Luxurious design',
        'Premium craftsmanship'
      ],
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Maroon', 'Navy', 'Green', 'Purple', 'Red'],
      inStock: true,
      category: 'Lehengas',
      brand: 'Groomy Solutions'
    },
    20: {
      id: 20,
      name: 'Cotton Churidar Set',
      price: 1599,
      originalPrice: 2299,
      discount: 30,
      rating: 4.4,
      reviews: 189,
      description: 'Comfortable cotton churidar set perfect for daily wear and casual occasions. Soft cotton fabric with beautiful design and comfortable fit.',
      features: [
        'Soft cotton fabric',
        'Comfortable churidar style',
        'Perfect for daily wear',
        'Beautiful design',
        'Easy to maintain',
        'Breathable fabric'
      ],
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Blue', 'Pink', 'Yellow', 'Green'],
      inStock: true,
      category: 'Suits',
      brand: 'Groomy Solutions'
    }
  }

  useEffect(() => {
    const foundProduct = mockProducts[id]
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedSize(foundProduct.sizes[0])
      setSelectedColor(foundProduct.colors[0])
    }
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    
    const cartItem = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    }
    
    addToCart(cartItem)
    alert('Product added to cart!')
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true)
      return
    }
    
    // Simulate payment success
    const orderData = {
      id: `ORD-${Date.now()}`,
      total: product.price * quantity,
      paymentId: `pay_${Date.now()}`,
      items: [{
        ...product,
        selectedSize,
        selectedColor,
        quantity
      }]
    }
    
    setOrderDetails(orderData)
    setShowSuccessModal(true)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-primary-600 hover:text-primary-700">
            ← Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          <span className="text-sm sm:text-base">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-xl sm:rounded-2xl overflow-hidden relative">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                onLoad={(e) => {
                  e.target.style.opacity = '1'
                }}
                onError={(e) => {
                  console.log('Product detail image failed to load:', product.images[activeImageIndex])
                  e.target.style.display = 'none'
                  e.target.nextElementSibling.style.display = 'flex'
                }}
                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 text-white items-center justify-center text-lg font-medium hidden">
                <span className="text-center px-4">{product.name}</span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors touch-manipulation ${
                    activeImageIndex === index ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onLoad={(e) => {
                      e.target.style.opacity = '1'
                    }}
                    onError={(e) => {
                      console.log('Thumbnail image failed to load:', image)
                      e.target.style.backgroundColor = '#8B5CF6'
                    }}
                    style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <span className="text-sm text-gray-500">Brand: {product.brand}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                {product.discount}% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Size:</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Color:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedColor === color
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantity:</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white border border-primary-500 text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Buy Now
                </button>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 border px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center ${
                    isWishlisted(product.id)
                      ? 'border-red-500 text-red-600 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isWishlisted(product.id) ? 'fill-current' : ''}`} />
                  {isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Delivery & Returns</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Truck className="h-5 w-5 mr-3 text-green-500" />
                  <span>Free delivery on orders above ₹999</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <RotateCcw className="h-5 w-5 mr-3 text-blue-500" />
                  <span>7-day easy returns</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Shield className="h-5 w-5 mr-3 text-purple-500" />
                  <span>100% authentic products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false)
          handleBuyNow()
        }}
      />

      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        orderDetails={orderDetails}
      />
    </div>
  )
}

export default ProductDetail
