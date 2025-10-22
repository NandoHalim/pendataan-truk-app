import { useState, useEffect } from 'react'

export function usePWA() {
  const [isPWA, setIsPWA] = useState(false)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const [showOfflineAlert, setShowOfflineAlert] = useState(false)

  useEffect(() => {
    // Check if app is running as PWA
    const checkPWA = () => {
      setIsPWA(
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone ||
        document.referrer.includes('android-app://')
      )
    }

    checkPWA()

    // Online/Offline detection
    const handleOnline = () => {
      setIsOffline(false)
      setShowOfflineAlert(false)
    }
    
    const handleOffline = () => {
      setIsOffline(true)
      setShowOfflineAlert(true)
      
      // Auto-hide offline alert after 5 seconds
      setTimeout(() => {
        setShowOfflineAlert(false)
      }, 5000)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    window.addEventListener('load', checkPWA)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('load', checkPWA)
    }
  }, [])

  return { 
    isPWA, 
    isOffline,
    showOfflineAlert 
  }
}