import * as React from 'react'
import {
  AppBar, Toolbar, IconButton, Typography,
  Container, Box, Paper, BottomNavigation, BottomNavigationAction,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SettingsIcon from '@mui/icons-material/Settings'

/**
 * App.jsx — shell mobile-first berbasis MUI
 * - AppBar sederhana (tanpa Drawer/router agar tidak menambah dependensi)
 * - BottomNavigation untuk tab utama (full-width di mobile)
 * - Container default maxWidth="sm" (diatur via theme)
 * Ganti konten placeholder di renderContent() dengan komponen kamu.
 */

export default function App() {
  const [tab, setTab] = React.useState('dashboard')

  function renderContent() {
    switch (tab) {
      case 'dashboard':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Dashboard</Typography>
            <Typography variant="body2" color="text.secondary">
              Ringkasan singkat—ganti dengan komponen Dashboard kamu.
            </Typography>
          </Box>
        )
      case 'data':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Data Truk</Typography>
            <Typography variant="body2" color="text.secondary">
              Tabel/daftar truk—tempatkan komponen TruckList/TruckForm di sini.
            </Typography>
          </Box>
        )
      case 'checklist':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Checklist</Typography>
            <Typography variant="body2" color="text.secondary">
              Form checklist pemeriksaan—tempatkan ChecklistCard di sini.
            </Typography>
          </Box>
        )
      case 'laporan':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Laporan</Typography>
            <Typography variant="body2" color="text.secondary">
              Grafik/export laporan—ganti dengan komponen laporan kamu.
            </Typography>
          </Box>
        )
      case 'pengaturan':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Pengaturan</Typography>
            <Typography variant="body2" color="text.secondary">
              Preferensi aplikasi, manajemen user/role, dsb.
            </Typography>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* AppBar simpel (mobile-first) */}
      <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
        <Toolbar>
          <IconButton edge="start" aria-label="menu" sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Pendataan Truk</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      {/* Konten utama */}
      <Box component="main" sx={{ flex: 1, pt: '64px', pb: '72px' }}>
        <Container sx={{ py: { xs: 2, sm: 3 } }}>
          {renderContent()}
        </Container>
      </Box>

      {/* Bottom Navigation (full-width di mobile) */}
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid #eee'
        }}
      >
        <BottomNavigation
          showLabels
          value={tab}
          onChange={(_, val) => setTab(val)}
        >
          <BottomNavigationAction label="Dashboard" value="dashboard" icon={<DashboardIcon />} />
          <BottomNavigationAction label="Data" value="data" icon={<LocalShippingIcon />} />
          <BottomNavigationAction label="Checklist" value="checklist" icon={<PlaylistAddCheckIcon />} />
          <BottomNavigationAction label="Laporan" value="laporan" icon={<AssessmentIcon />} />
          <BottomNavigationAction label="Pengaturan" value="pengaturan" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
