import { Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
// Usar URL pública en Vite para assets en public
const environmentImage = "/pollution-transparent.png";

export const NavBar = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  }

  const handleViewReports = () => {
    navigate("/view-reports");
  }

  const handleFillReport = () => {
    navigate("/fill-report");
  }

  return (
    <Box
      sx={{
        bgcolor: "#d8ffdaff",
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: {sx:2, md: 4},
          textAlign: "center",
          justifyContent: "space-between"
        }}
      >
        <Box
          onClick={handleHome}
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "initial",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <Box 
            component="img"
            src={environmentImage}
            alt="Environment Image"
            sx={{
              width: 50,
              objectFit: "cover",
              borderRadius: 2,
              bgColor: "green"
            }}
          />
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "green",
              display: {xs: "none", md: "block"},
              textTransform: "uppercase",
              letterSpacing: ".1rem",

            }}
          >
            Denuncias Ambientales
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: {xs: 2, md:4},
            textAlign: 'center',
            alignItems: "center"
          }}
        >
          <Box
            onClick={handleHome}
            sx={{
              cursor: "pointer"
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: {xs: ".9rem", md: ".95rem", lg: "1rem"},
                fontWeight: 500,
                color: "green",
                transition: "color 0.2s ease",
                ":hover": {
                  color: "#FBC02D"
                },
                cursor: "pointer"
              }}
            >
              Home
            </Typography>
          </Box>
          <Box
            onClick={handleViewReports}
            sx={{
              cursor: "pointer"
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: {xs: ".9rem", md: ".95rem", lg: "1rem"},
                fontWeight: 500,
                color: "green",
                transition: "color 0.2s ease",
                ":hover": {
                  color: "#FBC02D"
                },
                cursor: "pointer"
              }}
            >
              Ver denuncias
            </Typography>
          </Box>
          <Box
            onClick={handleFillReport}
            sx={{
              cursor: "pointer"
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: {xs: ".9rem", md: ".95rem", lg: "1rem"},
                fontWeight: 500,
                color: "green",
                transition: "color 0.2s ease",
                ":hover": {
                  color: "#FBC02D"
                },
                cursor: "pointer"
              }}
            >
              Realizar denuncia
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}