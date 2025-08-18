import { Button } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const GoBackButton = ({handleBack, isDisabled}) => {
  return (
    <Button 
      onClick={handleBack}
      disabled={isDisabled}
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
        transition: "all 0.2s ease-in-out",
        border: '2px solid #5F5F5F',
        cursor: isDisabled ? "not-allowed" : "pointer",
        "&.Mui-disabled": { 
          border: "2px solid #D0D0D0",
          color: "#B0B0B0", 
          backgroundColor: "#F8F8F8",
          "& .MuiSvgIcon-root": {
            color: "#B0B0B0",
          },
        },
        ":hover": {
          bgcolor: 'rgba(95, 95, 95, 0)',
        },
      }}
    >
      <ArrowBackIosIcon sx={{width: "1.2rem"}}/>
      Volver
    </Button>
  )
}
