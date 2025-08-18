import { useState } from "react"
import MapSelector from "../../components/MapSelector"
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { GoBackButton } from "../../components/buttons/GoBackButton";
import { ContinueButton } from "../../components/buttons/ContinueButton";
import EastIcon from '@mui/icons-material/East';
import Categories from "../../pages/home/Categories.json";
import { PhotoUpload } from "../../components/PhotoUpload";
import { useNavigate } from "react-router-dom";
import { SendDataModal } from "./modals/SendDataModal";

export const FormReport = () => {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();
  const [formSteps, setFormSteps] = useState(1);
  console.log(lat);
  console.log(long);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubCategory("");
  }

  const handleNext = () => {
    if (!category || !subcategory) return;
    if (formSteps === 3 ) {
      if(description.length > 0) {
        setOpenModal(true);
      }
      return;
    }
    setFormSteps((prev) => prev + 1);
  }

  const handleBack = () => {
    if(formSteps === 1) return;
    setFormSteps((prev) => prev - 1);
  }

  const handleSendData = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      navigate("/view-reports");
      setOpenModal(false);
    }, 2000);
  }

  const handleChange = (e) => {
    setDescription(e.target.value);
  }

  return (
    <Box>
      <Box 
        sx={{
          display: 'flex',
          gap: 0,
          height: "calc(100vh - 67.59px)",
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
            height: "calc(100vh - 67.59px)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              padding: "1rem 1rem",
              overflowY: "auto",
              overflowX: "hidden",
              flex: 1,
              minHeight: 0,
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
            {formSteps === 3 && (
              <Box>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: {xs: ".85rem", md: ".925rem", lg: "1rem"},
                    fontWeight: 500,
                    color: "#222222",
                  }}
                >
                  Descripción del problema
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
                  e.j.: 'En el Norte de Guayaquil el desecho de basura...'
                </Typography>
                <textarea 
                  name="description"
                  value={description}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    minWidth: "100%",
                    maxWidth: "100%", 
                    height: "15rem",
                    resize: "vertical",
                    boxSizing: "border-box",
                    fontFamily: "'Poppins', sans-serif",
                    padding: "0.5rem",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    borderRadius: ".25rem",
                    fontSize: "1rem",
                  }}
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'space-between',
              paddingInline: "0.7rem",
              paddingBottom: "1rem",
              flexShrink: 0,
            }}
          >
            <GoBackButton handleBack={handleBack} isDisabled={formSteps === 1 ? true: false}/>
            <ContinueButton handleNext={handleNext} name= {formSteps === 3 ? "Enviar": "Continuar"}/>
          </Box>
        </Box>
        <MapSelector onLocationSelected={(latitude, longitude) => {
          setLat(latitude);
          setLong(longitude);
        }}/>
      </Box>
      <SendDataModal
        handleOpenModal={openModal} 
        handleCloseModal={() => setOpenModal(false)} 
        handleConfirmation={handleSendData}
        isConfirmed={isConfirmed}
      />
    </Box>
  )
}
