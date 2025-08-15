import { Box, Typography } from "@mui/material"
import contaminacion from "../../assets/contaminacion_aire.jpg"
import incendio_forestal  from "../../assets/incendio_forestal.jpeg"
import mineria_ilegal from "../../assets/mineria_ilegal.jpeg"
import flora_fauna from "../../assets/flora_fauna.jpg"
import { useNavigate } from "react-router-dom"

export const HomePage = () => {

  const navigate = useNavigate();
  const handleReportCategory = () => {
    navigate('/fill-report');
  }

  return (
    <Box
      sx={{
        bgcolor: "#F1F8F6",
        width: "100%",
        maxWidth: "100%",
        height: "100vp",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginInline: {xs: "0rem", md: "5rem", lg:"10rem"},
          paddingTop: {xs: "1rem", sm: "2rem", md: "2.5rem", lg:"3rem"},
          paddingInline: {xs: "1rem", sm: "2rem", md: "2.5rem", lg:"3rem"}
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: {xs: "1rem", md: "1.125rem", lg: "1.25rem"},
              fontWeight: 400,
              color: "#000",
            }}
          >
            Nuestra plataforma te permite reportar contaminación, incendios forestales, minería ilegal y otras amenazas al ambiente para que las autoridades puedan actuar a tiempo.
          </Typography>
        </Box>
        <Box>
        <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: {xs: "1.3rem", md: "1.375rem", lg: "1.5rem"},
              fontWeight: 600,
              color: "#000",
            }}
          >
            Categorías de denuncias:
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {xs: "repeat(1, 1fr)", sm: "repeat(1, 1fr)", md: "repeat(1, 1fr)", lg:"repeat(2, 1fr)" },
            gap: 2,
            padding: 2
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: {xs: "1rem", md: "1.125rem", lg: "1.25rem"},
                fontWeight: 600,
                color: "#2E7D32",
              }}
            >
              Contaminación
            </Typography>
            <Box 
              onClick={handleReportCategory}
              component="img"
              src={contaminacion}
              alt="contaminacion_imagen"
              sx={{
                height: 500,
                width: 400,
                objectFit: "cover",
                borderRadius: ".5rem",
                cursor: "pointer"
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: {xs: "1rem", md: "1.125rem", lg: "1.25rem"},
                fontWeight: 600,
                color: "#D84315",
              }}
            >
              Incendios forestales
            </Typography>
            <Box 
              onClick={handleReportCategory}
              component="img"
              src={incendio_forestal}
              alt="incendios_forestales_imagen"
              sx={{
                height: 500,
                width: 400,
                objectFit: "cover",
                borderRadius: ".5rem",
                cursor: "pointer",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: {xs: "1rem", md: "1.125rem", lg: "1.25rem"},
                fontWeight: 600,
                color: "#6D4C41",
              }}
            >
              Minería ilegal
            </Typography>
            <Box 
              onClick={handleReportCategory}
              component="img"
              src={mineria_ilegal}
              alt="mineria_ilegal_imagen"
              sx={{
                height: 500,
                width: 400,
                objectFit: "cover",
                borderRadius: ".5rem",
                cursor: "pointer",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: {xs: "1rem", md: "1.125rem", lg: "1.25rem"},
                fontWeight: 600,
                color: "#43A047",
              }}
            >
              Protección de fauna y flora
            </Typography>
            <Box 
              onClick={handleReportCategory}
              component="img"
              src={flora_fauna}
              alt="flora_fauna_imagen"
              sx={{
                height: 500,
                width: 400,
                objectFit: "cover",
                borderRadius: ".5rem",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}