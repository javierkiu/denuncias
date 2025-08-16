import { Button } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const GoBackButton = ({handleBack}) => {
  return (
    <Button 
      onClick={handleBack}
      sx={{
        display: "flex",
        gap: 1,
        width: "48%",
        minWidth: '8rem',
        color:'#5F5F5F',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        fontSize: {xs:'.875rem', md: '1rem'},
        p: '.5rem 1rem',
        borderRadius: '.5rem',
        textTransform: 'none',
        border: '2px solid #5F5F5F',
        ":hover": {
          bgcolor: 'rgba(95, 95, 95, 0.5)',
          color: "#fff",
          border: "2px solid rgba(95, 95, 95, 0)",
        }
      }}
    >
      <ArrowBackIosIcon sx={{width: "1.2rem"}}/>
      Volver
    </Button>
  )
}
