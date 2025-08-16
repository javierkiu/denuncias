import { useState } from "react"
import MapSelector from "../../components/MapSelector"
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { GoBackButton } from "../../components/buttons/GoBackButton";
import { ContinueButton } from "../../components/buttons/ContinueButton";
import EastIcon from '@mui/icons-material/East';
import Categories from "../../pages/home/Categories.json";
import { Label } from "@mui/icons-material";
import { PhotoUpload } from "../../components/PhotoUpload";

export const FormReport = () => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [formSteps, setFormSteps] = useState(1);
  console.log(lat);
  console.log(long);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubCategory("");
  }

  const handleNext = () => {
    if (!category || !subcategory) return;
    setFormSteps((prev) => prev + 1);
  }

  const handleBack = () => {
    if(formSteps === 1) return;
    setFormSteps((prev) => prev - 1);
  }

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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "35%",
            bgcolor: "#fff",
            mb: ".5rem",
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
                display: "flex",
                gap: ".5rem",
                fontFamily: "'Poppins', sans-serif",
                fontSize: {xs: ".85rem", md: ".925rem", lg: "1rem"},
                fontWeight: 400,
                color: "#8E8E8E",
              }}
            >
              <EastIcon sx={{width: "1.2rem"}}/> Da Click en cualquier parte del mapa o busca la ubicación exacta del incidente
            </Typography>
            {formSteps === 1 && (
              <>
                <Typography
                  sx={{
                    display: "flex",
                    gap: ".5rem",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: {xs: ".85rem", md: ".925rem", lg: "1rem"},
                    fontWeight: 400,
                    color: "#222222",
                    mb: ".25rem",
                    mt: 2,
                  }}
                >
                  Elige la categoría a denunciar (ej.: Contaminación).
                </Typography>
                <FormControl fullWidth sx={{ mb: 2, }}>
                  <InputLabel
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: {xs: ".85rem", md: ".925rem", lg: "1rem"},
                      fontWeight: 500,
                      color: "#222222",
                    }}
                  >
                    Categoría
                  </InputLabel>
                  <Select value={category} onChange={handleCategoryChange}>
                    {Categories.map((cat) => (
                      <MenuItem key={cat.category} value={cat.category}>
                        {cat.category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography
                  sx={{
                    display: "flex",
                    gap: ".5rem",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: {xs: ".85rem", md: ".925rem", lg: "1rem"},
                    fontWeight: 400,
                    color: "#222222",
                    mb: ".25rem",
                  }}
                >
                  Elige la subcategoría a denunciar (ej.: Basura en la vía pública).
                </Typography>
                <FormControl fullWidth sx={{ mb: 2 }} disabled={!category}>
                  <InputLabel
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: {xs: ".85rem", md: ".925rem", lg: "1rem"},
                      fontWeight: 500,
                      color: "#222222",
                    }}
                  >
                    Subcategoría 
                  </InputLabel>
                  <Select value={subcategory} onChange={(e) => setSubCategory(e.target.value)}>
                    {Categories.find((cat) => cat.category === category)?.subcategories.map(
                      (sub) => (
                        <MenuItem key={sub} value={sub}>
                          {sub}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </>
            )}
            {formSteps === 2 && (
              <>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: {xs: ".85rem", md: ".925rem", lg: "1rem"},
                    fontWeight: 500,
                    color: "#222222",
                  }}
                >
                  Foto(opcional)
                </Typography>
                <PhotoUpload />
              </>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'space-between',
              paddingInline: "0.7rem",
            }}
          >
            <GoBackButton handleBack={handleBack}/>
            <ContinueButton handleNext={handleNext}/>
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
