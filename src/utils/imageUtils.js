// Image utility functions for better image handling

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export const preloadImages = async (imageUrls) => {
  try {
    const promises = imageUrls.map(url => preloadImage(url))
    const results = await Promise.allSettled(promises)
    
    const successful = results.filter(result => result.status === 'fulfilled').length
    const failed = results.filter(result => result.status === 'rejected').length
    
    console.log(`Image preload results: ${successful} successful, ${failed} failed`)
    
    return {
      successful,
      failed,
      results
    }
  } catch (error) {
    console.error('Error preloading images:', error)
    return { successful: 0, failed: imageUrls.length, results: [] }
  }
}

export const getImageWithFallback = (primaryUrl, fallbackUrl = null) => {
  return new Promise((resolve) => {
    const img = new Image()
    
    img.onload = () => {
      resolve(primaryUrl)
    }
    
    img.onerror = () => {
      if (fallbackUrl) {
        const fallbackImg = new Image()
        fallbackImg.onload = () => resolve(fallbackUrl)
        fallbackImg.onerror = () => resolve(null)
        fallbackImg.src = fallbackUrl
      } else {
        resolve(null)
      }
    }
    
    img.src = primaryUrl
  })
}

export const createPlaceholderImage = (width, height, text, bgColor = '8B5CF6', textColor = 'FFFFFF') => {
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`
}

export const optimizeImageUrl = (url, width = 600, quality = 80) => {
  if (url.includes('unsplash.com')) {
    // Add Unsplash optimization parameters
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}ixlib=rb-4.0.3&auto=format&fit=crop&w=${width}&q=${quality}`
  }
  return url
}

export const validateImageUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Enhanced image component with better error handling
export const createImageElement = (src, alt, className, onLoad, onError) => {
  const img = document.createElement('img')
  img.src = src
  img.alt = alt
  img.className = className
  
  if (onLoad) img.onload = onLoad
  if (onError) img.onerror = onError
  
  return img
}

// Image loading status tracker
export class ImageLoadTracker {
  constructor() {
    this.loadedImages = new Set()
    this.failedImages = new Set()
    this.loadingImages = new Set()
  }

  startLoading(url) {
    this.loadingImages.add(url)
  }

  markLoaded(url) {
    this.loadingImages.delete(url)
    this.loadedImages.add(url)
    this.failedImages.delete(url)
  }

  markFailed(url) {
    this.loadingImages.delete(url)
    this.failedImages.add(url)
    this.loadedImages.delete(url)
  }

  getStatus(url) {
    if (this.loadedImages.has(url)) return 'loaded'
    if (this.failedImages.has(url)) return 'failed'
    if (this.loadingImages.has(url)) return 'loading'
    return 'not-started'
  }

  getStats() {
    return {
      loaded: this.loadedImages.size,
      failed: this.failedImages.size,
      loading: this.loadingImages.size,
      total: this.loadedImages.size + this.failedImages.size + this.loadingImages.size
    }
  }

  reset() {
    this.loadedImages.clear()
    this.failedImages.clear()
    this.loadingImages.clear()
  }
}

// Global image tracker instance
export const globalImageTracker = new ImageLoadTracker()

// Test all images used in the application
export const testAllImages = async () => {
  const testImages = [
    // Dashboard images
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    
    // Product detail images
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    
    // Shop page images
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
  ]

  console.log('Testing all application images...')
  const results = await preloadImages(testImages)
  
  console.log('Image test results:', results)
  return results
}

export default {
  preloadImage,
  preloadImages,
  getImageWithFallback,
  createPlaceholderImage,
  optimizeImageUrl,
  validateImageUrl,
  createImageElement,
  ImageLoadTracker,
  globalImageTracker,
  testAllImages
}
