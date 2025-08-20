import { useState, useEffect } from 'react'
import { testAllImages, globalImageTracker } from '../utils/imageUtils'

const ImageTest = () => {
  const [imageStatus, setImageStatus] = useState({})
  const [testResults, setTestResults] = useState(null)
  const [isTestingAll, setIsTestingAll] = useState(false)

  const testImages = [
    {
      id: 'kurti1',
      name: 'Purple Kurti (Dashboard)',
      url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'saree1',
      name: 'Silk Saree (Dashboard)',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
  id: 'kurti2',
  name: 'Floral Print Kurti',
  url: 'https://images.unsplash.com/photo-FDili0Go6iM?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
},

    {
      id: 'jewelry',
      name: 'Jewelry Set (Product Detail)',
      url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'kurti_shop',
      name: 'Purple Kurti (Shop)',
      url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'saree_shop',
      name: 'Silk Saree (Shop)',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ]

  useEffect(() => {
    // Run comprehensive test on component mount
    runComprehensiveTest()
  }, [])

  const runComprehensiveTest = async () => {
    setIsTestingAll(true)
    try {
      const results = await testAllImages()
      setTestResults(results)
    } catch (error) {
      console.error('Error running comprehensive test:', error)
    } finally {
      setIsTestingAll(false)
    }
  }

  const handleImageLoad = (id) => {
    setImageStatus(prev => ({ ...prev, [id]: 'loaded' }))
    globalImageTracker.markLoaded(testImages.find(img => img.id === id)?.url)
  }

  const handleImageError = (id) => {
    setImageStatus(prev => ({ ...prev, [id]: 'error' }))
    globalImageTracker.markFailed(testImages.find(img => img.id === id)?.url)
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Image Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testImages.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-200 relative">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover"
                onLoad={() => handleImageLoad(image.id)}
                onError={() => handleImageError(image.id)}
              />
              {imageStatus[image.id] === 'error' && (
                <div className="absolute inset-0 bg-red-100 flex items-center justify-center">
                  <span className="text-red-600 text-sm">Failed to load</span>
                </div>
              )}
              {imageStatus[image.id] === 'loaded' && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  ✓ Loaded
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{image.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Status: {imageStatus[image.id] || 'loading...'}
              </p>
              <p className="text-xs text-gray-500 mt-2 break-all">
                {image.url}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Image Status Summary</h2>
        <div className="space-y-2">
          {testImages.map((image) => (
            <div key={image.id} className="flex items-center justify-between">
              <span className="text-gray-700">{image.name}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                imageStatus[image.id] === 'loaded' 
                  ? 'bg-green-100 text-green-800' 
                  : imageStatus[image.id] === 'error'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {imageStatus[image.id] || 'Loading'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Comprehensive Test Results */}
      {testResults && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Comprehensive Image Test Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{testResults.successful}</div>
              <div className="text-sm text-gray-600">Images Loaded</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{testResults.failed}</div>
              <div className="text-sm text-gray-600">Images Failed</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((testResults.successful / (testResults.successful + testResults.failed)) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
          {testResults.failed > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Failed Images Need Attention</h4>
              <p className="text-red-800 text-sm">
                Some images failed to load. Check the browser console for detailed error messages.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Test Controls */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Controls</h3>
        <div className="flex space-x-4">
          <button
            onClick={runComprehensiveTest}
            disabled={isTestingAll}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTestingAll ? 'Testing...' : 'Run Comprehensive Test'}
          </button>
          <button
            onClick={() => {
              setImageStatus({})
              setTestResults(null)
              globalImageTracker.reset()
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Reset All Tests
          </button>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Image Testing Instructions</h3>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• All images should show "✓ Loaded" indicator</li>
          <li>• If any image shows "Failed to load", there's an issue</li>
          <li>• Images should load within 2-3 seconds</li>
          <li>• Check browser console for any errors</li>
          <li>• Run comprehensive test to check all app images</li>
          <li>• Success rate should be 100% for optimal performance</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageTest
