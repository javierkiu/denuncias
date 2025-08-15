import { useState } from "react"
import MapSelector from "../../components/MapSelector"
import { Box, Typography } from "@mui/material";
import { GoBackButton } from "../../components/buttons/GoBackButton";
import { ContinueButton } from "../../components/buttons/ContinueButton";

export const FormReport = () => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  console.log(lat);
  console.log(long);
  return (
    <Box>
      <Box 
        sx={{
          display: 'flex',
          gap: 0,
        }}
      >
        <Box 
          sx={{
            width: "35%",
            bgcolor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              padding: "1rem 1rem"
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: {xs: "1.225rem", md: "1.3rem", lg: "1.8rem"},
                fontWeight: 400,
                color: "#222222",
              }}
            >
              Reporta tu problema
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: {xs: ".85rem", md: ".925rem", lg: "1rem"},
                fontWeight: 400,
                color: "#8E8E8E",
              }}
            >
              Da Click en cualquier parte del mapa o busca la ubicación exacta del incidente
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center'
            }}
          >
            <GoBackButton />
            <ContinueButton />
          </Box>
        </Box>
        <MapSelector onLocationSelected={(latitude, longitude) => {
          setLat(latitude);
          setLong(longitude);
        }}/>
      </Box>
    </Box>
  )
}
