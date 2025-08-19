import Breadcrumb from './Breadcrumb'

const PageHeader = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  breadcrumbItems = null,
  className = "",
  overlay = true 
}) => {
  const defaultBg = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  
  return (
    <>
      <Breadcrumb customItems={breadcrumbItems} />
      <div className={`relative bg-gray-900 ${className}`}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage || defaultBg})`
          }}
        />
        
        {/* Overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        )}
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PageHeader
