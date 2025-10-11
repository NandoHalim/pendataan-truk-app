import * as React from 'react'
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItemButton,
  ListItemText, Box, Container, Divider, useMediaQuery
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useTheme } from '@mui/material/styles'
import { Link, useLocation } from 'react-router-dom'

const NAV_WIDTH = 240

export default function AppLayout({ children }) {
  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const [open, setOpen] = React.useState(false)
  const { pathname } = useLocation()

  const Nav = (
    <Box sx={{ width: NAV_WIDTH, p: 1 }}>
      <Typography variant="subtitle2" sx={{ px: 2, py: 1, opacity: 0.7 }}>Menu</Typography>
      <List>
        {[
          { to: '/', label: 'Dashboard' },
          { to: '/trucks', label: 'Data Truk' },
          { to: '/inspections', label: 'Checklist' },
        ].map(item => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            selected={pathname === item.to}
            onClick={() => setOpen(false)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh', bgcolor: 'background.default' }}>
      {/* AppBar – selalu ada di mobile */}
      <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
        <Toolbar sx={{ gap: 1 }}>
          {!mdUp && (
            <IconButton edge="start" onClick={() => setOpen(true)} aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Pendataan Truk</Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      {/* Drawer: temporary di mobile, permanent di desktop */}
      {mdUp ? (
        <Drawer
          variant="permanent"
          open
          PaperProps={{ sx: { width: NAV_WIDTH, borderRight: '1px solid #eee' } }}
        >
          <Toolbar /> {/* spacer AppBar */}
          {Nav}
        </Drawer>
      ) : (
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{ sx: { width: NAV_WIDTH } }}
        >
          <Toolbar />
          {Nav}
        </Drawer>
      )}

      {/* Konten: padding kecil di mobile, lebih lega di mdUp */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${NAV_WIDTH}px` },
          pt: '64px', // tinggi AppBar
        }}
      >
        <Container sx={{ py: { xs: 2, sm: 3 } }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}
