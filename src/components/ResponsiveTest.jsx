import { useResponsive, useTouch, useOrientation } from '../hooks/useResponsive'

const ResponsiveTest = () => {
  const { screenSize, isMobile, isTablet, isDesktop, isSmallScreen } = useResponsive()
  const isTouch = useTouch()
  const orientation = useOrientation()

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 max-w-xs">
      <div className="space-y-1">
        <div>Screen: {screenSize.width}x{screenSize.height}</div>
        <div>Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</div>
        <div>Touch: {isTouch ? 'Yes' : 'No'}</div>
        <div>Orientation: {orientation}</div>
        <div className="text-xs text-gray-300 mt-2">
          {isMobile && '📱 Mobile optimized'}
          {isTablet && '📱 Tablet optimized'}
          {isDesktop && '💻 Desktop optimized'}
        </div>
      </div>
    </div>
  )
}

export default ResponsiveTest
