import { Button } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const ContinueButton = ({handleNext}) => {
  return (
    <Button 
      onClick={handleNext}
      sx={{
        display: "flex",
        gap: 1,
        width: "48%",
        background: "linear-gradient(rgb(255, 232, 128), rgb(255, 208, 0))",
        minWidth: '8rem',
        color:'#222222',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        fontSize: {xs:'.875rem', md: '1rem'},
        p: '.438rem 1rem',
        borderRadius: '.5rem',
        textTransform: 'none',
        ":hover" : {
          filter: "brightness(95%)",
        }
      }}
    >
      Continuar
      <ArrowForwardIosIcon sx={{width: "1.2rem"}}/>
    </Button>
  )
}
