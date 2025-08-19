// Sample product data
export const products = [
  {
    id: 1,
    name: "Elegant Silk Saree with Golden Border",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    category: "sarees",
    subcategory: "silk",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviews: 128,
    isHot: true,
    description: "Beautiful silk saree with intricate golden border work, perfect for special occasions.",
    colors: ["Red", "Blue", "Green", "Purple"],
    sizes: ["Free Size"],
    fabric: "Pure Silk",
    care: "Dry Clean Only"
  },
  {
    id: 2,
    name: "Cotton Printed Kurti Set",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    category: "kurtis",
    subcategory: "cotton",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.2,
    reviews: 89,
    isHot: false,
    description: "Comfortable cotton kurti with palazzo pants, ideal for daily wear.",
    colors: ["White", "Pink", "Yellow", "Light Blue"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "100% Cotton",
    care: "Machine Wash"
  },
  {
    id: 3,
    name: "Designer Anarkali Suit",
    price: 3299,
    originalPrice: 4999,
    discount: 34,
    category: "suits",
    subcategory: "anarkali",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviews: 156,
    isHot: true,
    description: "Stunning designer anarkali suit with heavy embroidery work.",
    colors: ["Maroon", "Navy Blue", "Emerald Green"],
    sizes: ["S", "M", "L", "XL"],
    fabric: "Georgette",
    care: "Dry Clean Only"
  },
  {
    id: 4,
    name: "Casual Straight Kurti",
    price: 599,
    originalPrice: 899,
    discount: 33,
    category: "kurtis",
    subcategory: "casual",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.0,
    reviews: 67,
    isHot: false,
    description: "Simple and elegant straight kurti for everyday comfort.",
    colors: ["Black", "White", "Grey", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    fabric: "Cotton Blend",
    care: "Machine Wash"
  },
  {
    id: 5,
    name: "Banarasi Silk Saree",
    price: 4999,
    originalPrice: 7999,
    discount: 38,
    category: "sarees",
    subcategory: "banarasi",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews: 203,
    isHot: true,
    description: "Authentic Banarasi silk saree with traditional motifs.",
    colors: ["Gold", "Red", "Purple", "Green"],
    sizes: ["Free Size"],
    fabric: "Pure Banarasi Silk",
    care: "Dry Clean Only"
  },
  {
    id: 6,
    name: "Embroidered Party Wear Kurti",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    category: "kurtis",
    subcategory: "party",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.3,
    reviews: 94,
    isHot: false,
    description: "Beautifully embroidered kurti perfect for parties and celebrations.",
    colors: ["Royal Blue", "Wine", "Black", "Teal"],
    sizes: ["S", "M", "L", "XL"],
    fabric: "Georgette",
    care: "Dry Clean Recommended"
  },
  {
    id: 7,
    name: "Chiffon Printed Saree",
    price: 1299,
    originalPrice: 1899,
    discount: 32,
    category: "sarees",
    subcategory: "chiffon",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.1,
    reviews: 76,
    isHot: false,
    description: "Lightweight chiffon saree with beautiful floral prints.",
    colors: ["Pink", "Blue", "Green", "Orange"],
    sizes: ["Free Size"],
    fabric: "Chiffon",
    care: "Hand Wash"
  },
  {
    id: 8,
    name: "Indo-Western Kurti",
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    category: "kurtis",
    subcategory: "indo-western",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    reviews: 112,
    isHot: false,
    description: "Trendy indo-western kurti with modern cuts and traditional elements.",
    colors: ["Mustard", "Coral", "Mint Green", "Lavender"],
    sizes: ["S", "M", "L", "XL"],
    fabric: "Rayon",
    care: "Machine Wash"
  }
]

export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'sarees', name: 'Sarees', count: products.filter(p => p.category === 'sarees').length },
  { id: 'kurtis', name: 'Kurtis', count: products.filter(p => p.category === 'kurtis').length },
  { id: 'suits', name: 'Suits', count: products.filter(p => p.category === 'suits').length },
  { id: 'lehengas', name: 'Lehengas', count: 0 },
  { id: 'accessories', name: 'Accessories', count: 0 }
]

export const getProductsByCategory = (category) => {
  if (category === 'all') return products
  return products.filter(product => product.category === category)
}

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

export const getFeaturedProducts = (limit = 4) => {
  return products.filter(product => product.isHot).slice(0, limit)
}

export const getProductsByPriceRange = (min, max) => {
  return products.filter(product => product.price >= min && product.price <= max)
}

export const sortProducts = (products, sortBy) => {
  switch (sortBy) {
    case 'price-low':
      return [...products].sort((a, b) => a.price - b.price)
    case 'price-high':
      return [...products].sort((a, b) => b.price - a.price)
    case 'rating':
      return [...products].sort((a, b) => b.rating - a.rating)
    case 'newest':
      return [...products].sort((a, b) => b.id - a.id)
    case 'popular':
      return [...products].sort((a, b) => b.reviews - a.reviews)
    default:
      return products
  }
}
