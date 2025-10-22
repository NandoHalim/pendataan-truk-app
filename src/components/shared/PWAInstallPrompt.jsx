import { useState, useEffect } from 'react'
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Typography,
  Box 
} from '@mui/material'
import { InstallDesktop, Close, PhoneIphone } from '@mui/icons-material'

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      // Prevent Chrome 76+ from automatically showing the prompt
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Show prompt after a short delay for better UX
      setTimeout(() => {
        setShowPrompt(true)
      }, 1500)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App already installed as PWA')
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      console.log(`User response to the install prompt: ${outcome}`)
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
        // Track installation in your analytics
        console.log('PWA installed successfully')
      }
      setShowPrompt(false)
    }
  }

  const handleClose = () => {
    setShowPrompt(false)
    // Optionally store in localStorage to not show again for some time
    localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString())
  }

  // Don't show if dismissed recently
  const dismissedTime = localStorage.getItem('pwa-prompt-dismissed')
  if (dismissedTime) {
    const dismissedDate = new Date(dismissedTime)
    const now = new Date()
    const diffHours = (now - dismissedDate) / (1000 * 60 * 60)
    if (diffHours < 24) { // Don't show for 24 hours
      return null
    }
  }

  return (
    <Dialog 
      open={showPrompt} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <PhoneIphone color="primary" />
          <Typography variant="h6" component="span">
            Install Aplikasi Truk
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Typography variant="body1" paragraph>
          <strong>Install aplikasi Pendataan Truk</strong> untuk pengalaman yang lebih baik!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ✓ Akses cepat dari home screen<br />
          ✓ Kerja offline<br />
          ✓ Notifikasi real-time<br />
          ✓ Performa lebih cepat
        </Typography>
      </DialogContent>
      
      <DialogActions>
        <Button 
          onClick={handleClose} 
          startIcon={<Close />}
          color="inherit"
        >
          Nanti Saja
        </Button>
        <Button 
          onClick={handleInstall} 
          variant="contained" 
          startIcon={<InstallDesktop />}
          color="primary"
        >
          Install Sekarang
        </Button>
      </DialogActions>
    </Dialog>
  )
}