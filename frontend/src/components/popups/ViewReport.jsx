import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  IconButton
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CloseIcon from "@mui/icons-material/Close";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {Box} from "@mui/material";

export default function ViewReport({denuncia}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const lat = parseFloat(denuncia.latitud);
  const lng = parseFloat(denuncia.longitud);
  const hasLocation = !isNaN(lat) && !isNaN(lng);

  return (
    <div>
      {/* Botón que abre el pop-up */}
      <IconButton aria-label="view" onClick={handleClickOpen}>
        <OpenInNewIcon />
      </IconButton>

      {/* El Pop-up */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
          <DialogTitle>Detalles</DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon style={{marginRight:'5px', width:"2rem", height:"2rem"}}/>
          </IconButton>
        </Box>
        <DialogContent dividers>
          <DialogContentText component="div">
            <Typography variant="body1" gutterBottom>
              <strong>ID:</strong> {denuncia.id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Categoría:</strong> {denuncia.categoria}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Subcategoría:</strong> {denuncia.subcategoria}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Fecha:</strong> {denuncia.fecha}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Descripción:</strong> {denuncia.descripcion}
            </Typography>
            {
              denuncia.foto_url && (
                <>
                  <Typography variant="body1" gutterBottom>
                    <strong>Imagen:</strong>
                  </Typography>
                  <img 
                    src={denuncia.foto_url}
                    alt="Foto denuncia"
                    style={{ width: "100%", maxHeight: "200px", objectFit: "cover"}}
                  />
                </>
              )
            }
            {
              hasLocation && (
                <>
                  <Typography variant="body1" gutterBottom>
                    <strong>Ubicación:</strong>
                  </Typography>
                  <div style={{ height: "300px", width: "100%", marginTop: "8px" }}>
                    <MapContainer
                      center={[lat, lng]}
                      zoom={15}
                      style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[lat, lng]}>
                        <Popup>Denuncia #{denuncia.id}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </>
              )
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} autoFocus style={{fontWeight: "bold"}}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
