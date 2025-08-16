import { Button } from "@mui/material"

export const ConfirmButton = ({handleConfirmation}) => {
  return (
    <Button
      onClick={handleConfirmation}
      sx={{
        minWidth: '8rem',
        color:'white',
        backgroundColor: '#34C759',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 600,
        fontSize: {xs:'.875rem', md: '1rem'},
        p: '.5rem 1rem',
        borderRadius: '.5rem',
        textTransform: 'none',
        border: '2px solid #34C759',
        ":hover" : {
          backgroundColor: "#009951",
          border: "2px solid #009951"
        }
      }}
    >
      Confirmar
    </Button>
  )
}