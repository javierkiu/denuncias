import { Button } from '@mui/material'

export const GoBackButton = (handleBack) => {
  return (
    <Button 
      onClick={handleBack}
      sx={{
        minWidth: '8rem',
        color:'#8E8E8E',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: {xs:'.875rem', md: '1rem'},
        p: '.5rem 1rem',
        borderRadius: '.5rem',
        textTransform: 'none',
        border: '2px solid #8E8E8E',
      }}
    >
      Volver
    </Button>
  )
}
