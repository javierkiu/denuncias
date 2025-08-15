import { Button } from '@mui/material'

export const ContinueButton = (handleNext) => {
  return (
    <Button 
      onClick={handleNext}
      sx={{
        bgcolor: "#FFD000",
        minWidth: '8rem',
        color:'#222222',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: {xs:'.875rem', md: '1rem'},
        p: '.5rem 1rem',
        borderRadius: '.5rem',
        textTransform: 'none',
        ":hover" : {
          backgroundColor: "#FFC300",
        }
      }}
    >
      Continuar
    </Button>
  )
}
