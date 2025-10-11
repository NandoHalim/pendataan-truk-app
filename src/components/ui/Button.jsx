import { Button as MUIButton } from '@mui/material'

export default function Button({ children, ...props }) {
  return (
    <MUIButton
      variant={props.variant || 'contained'}
      size={props.size || 'small'}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 2,
        ...props.sx
      }}
      {...props}
    >
      {children}
    </MUIButton>
  )
}
