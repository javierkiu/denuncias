import { Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

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
        bgcolor: "green",
        padding: ".5rem 1rem"
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 4,
          textAlign: "center",
          justifyContent: "space-between"
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 500,
              color: "#fff",
            }}
          >
            Denuncias Ambientales
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 4,
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
              fontSize: '1rem',
              fontWeight: 500,
              color: "#fff",
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
              fontSize: '1rem',
              fontWeight: 500,
              color: "#fff",
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
              fontSize: '1rem',
              fontWeight: 500,
              color: "#fff",
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