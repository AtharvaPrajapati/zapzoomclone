import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation()
  
  // Define custom breadcrumb mappings
  const breadcrumbMap = {
    '/': 'Home',
    '/shop': 'Shop',
    '/sarees': 'Sarees',
    '/kurtis': 'Kurtis',
    '/about': 'About Us',
    '/contact': 'Contact',
    '/cart': 'Shopping Cart',
    '/login': 'Login',
    '/register': 'Register',
    '/dashboard': 'Dashboard',
    '/dashboard/profile': 'Profile',
    '/dashboard/orders': 'Orders',
    '/dashboard/wishlist': 'Wishlist',
    '/dashboard/addresses': 'Addresses',
    '/privacy-policy': 'Privacy Policy',
    '/terms-conditions': 'Terms & Conditions',
    '/return-policy': 'Return Policy'
  }

  // If custom items are provided, use them
  if (customItems) {
    return (
      <nav className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                to="/" 
                className="text-gray-500 hover:text-primary-600 transition-colors flex items-center"
              >
                <Home className="h-4 w-4" />
              </Link>
            </li>
            {customItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                {item.href ? (
                  <Link 
                    to={item.href}
                    className="text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    )
  }

  // Generate breadcrumbs from current path
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '')
  
  // Don't show breadcrumb on home page
  if (location.pathname === '/') {
    return null
  }

  const breadcrumbItems = []
  let currentPath = ''

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const isLast = index === pathSegments.length - 1
    const label = breadcrumbMap[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)

    breadcrumbItems.push({
      label,
      href: isLast ? null : currentPath,
      isLast
    })
  })

  return (
    <nav className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="text-gray-500 hover:text-primary-600 transition-colors flex items-center"
            >
              <Home className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Home</span>
            </Link>
          </li>
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              {item.href ? (
                <Link 
                  to={item.href}
                  className="text-gray-500 hover:text-primary-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumb
