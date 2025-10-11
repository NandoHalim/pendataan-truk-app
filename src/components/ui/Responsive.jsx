import * as React from 'react'
import { Grid, Stack, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Button from '@/components/ui/Button'

/** Tombol responsif: full width di mobile, auto di ≥sm */
export function ActionsBar({ children, spacing = 1, ...props }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={spacing}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              sx: {
                width: { xs: '100%', sm: 'auto' },
                ...(child.props.sx || {})
              }
            })
          : child
      )}
    </Stack>
  )
}

/** Dua kolom: 1 kolom di mobile (xs=12), 2 kolom di desktop (md=6) */
export function TwoCols({ left, right, spacing = 1.5, ...props }) {
  return (
    <Grid container spacing={spacing} {...props}>
      <Grid item xs={12} md={6}>{left}</Grid>
      <Grid item xs={12} md={6}>{right}</Grid>
    </Grid>
  )
}

/** Baris field: grid responsif untuk form (3 kolom di md) */
export function FieldRow({ children, spacing = 1.5, mdCols = 3, ...props }) {
  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const mdSpan = Math.max(1, Math.floor(12 / mdCols)) // 12/3=4 → 3 kolom
  return (
    <Grid container spacing={spacing} {...props}>
      {React.Children.map(children, (child, i) => (
        <Grid key={i} item xs={12} md={mdSpan}>
          {child}
        </Grid>
      ))}
    </Grid>
  )
}

/** Shortcut tombol umum (optional, boleh dihapus kalau tak perlu) */
export function PrimaryButton(props){ return <Button variant="contained" {...props} /> }
export function SecondaryButton(props){ return <Button variant="outlined" color="secondary" {...props} /> }
