import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { IconButton } from "@mui/material";

export default function ViewReport(denuncia) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {/* Botón que abre el pop-up */}
      <IconButton aria-label="view" onClick={handleClickOpen}>
        <OpenInNewIcon />
      </IconButton>

      {/* El Pop-up */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Detalles</DialogTitle>
        <DialogContent dividers>
          <DialogContentText component="div">
            <Typography variant="body1" gutterBottom>
              <strong>ID:</strong> {denuncia.denuncia.id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Categoría:</strong> {denuncia.denuncia.categoria}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Subcategoría:</strong> {denuncia.denuncia.subcategoria}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Fecha:</strong> {denuncia.denuncia.fecha}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Descripción:</strong> {denuncia.denuncia.descripcion}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
