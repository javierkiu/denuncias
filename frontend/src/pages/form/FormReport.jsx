import { useState } from "react"
import MapSelector from "../../components/MapSelector"
import { Box } from "@mui/material";

export const FormReport = () => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(long)
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
            width: "40%",
            bgcolor: "#8E8E"
          }}
        >
        </Box>
        <MapSelector onLocationSelected={(latitude, longitude) => {
          setLat(latitude);
          setLong(longitude);
        }}/>
      </Box>
    </Box>
  )
}
