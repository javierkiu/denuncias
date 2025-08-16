import { Button } from "@mui/material"

export const CancelButton = ({handleCancel}) => {
  return (
    <Button 
      onClick={handleCancel}
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
        ":hover" : {
          backgroundColor: "#000",
          color: "white",
          border: "2px solid #000"
        }
      }}
    >
      Cancelar
    </Button>
  )
}