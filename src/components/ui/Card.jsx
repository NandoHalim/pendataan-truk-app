import { Card as MUICard, CardContent, Typography } from '@mui/material'

export default function Card({ title, children, ...props }) {
  return (
    <MUICard
      elevation={1}
      sx={{ borderRadius: 2, mb: 2, ...props.sx }}
      {...props}
    >
      {title && (
        <Typography
          variant="subtitle1"
          sx={{ px: 2, pt: 1.5, pb: 0, fontWeight: 600 }}
        >
          {title}
        </Typography>
      )}
      <CardContent>{children}</CardContent>
    </MUICard>
  )
}
