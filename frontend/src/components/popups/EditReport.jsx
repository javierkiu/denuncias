import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Alert
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Categories from '../../pages/home/Categories.json';

const EditReport = ({ open, onClose, denuncia, onEditSuccess }) => {
  const [formData, setFormData] = useState({
    categoria: '',
    subcategoria: '',
    descripcion: '',
    latitud: '',
    longitud: '',
    fecha: '',
    foto_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (denuncia) {
      setFormData({
        categoria: denuncia.categoria || '',
        subcategoria: denuncia.subcategoria || '',
        descripcion: denuncia.descripcion || '',
        latitud: denuncia.latitud || '',
        longitud: denuncia.longitud || '',
        fecha: denuncia.fecha ? denuncia.fecha.split(' ')[0] : '',
        foto_url: denuncia.foto_url || ''
      });
    }
  }, [denuncia]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.categoria || !formData.subcategoria || !formData.descripcion || !formData.latitud || !formData.longitud) {
      setError('Todos los campos obligatorios deben estar completos');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/denuncias.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: denuncia.id,
          categoria: formData.categoria,
          subcategoria: formData.subcategoria,
          descripcion: formData.descripcion,
          latitud: parseFloat(formData.latitud),
          longitud: parseFloat(formData.longitud),
          fecha: formData.fecha,
          foto_url: formData.foto_url
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar la denuncia');
      }

      const result = await response.json();
      setSuccess('Denuncia actualizada exitosamente');
      
      // Cerrar modal después de 1.5 segundos
      setTimeout(() => {
        onEditSuccess();
        onClose();
      }, 1500);

    } catch (error) {
      setError(error.message || 'Error al actualizar la denuncia');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setSuccess('');
    setFormData({
      categoria: '',
      subcategoria: '',
      descripcion: '',
      latitud: '',
      longitud: '',
      fecha: '',
      foto_url: ''
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" component="div">
          Editar Denuncia #{denuncia?.id}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          
          {success && (
            <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
            </Grid>
          )}

          {/* Categoría */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Categoría *</InputLabel>
              <Select
                value={formData.categoria}
                onChange={(e) => handleInputChange('categoria', e.target.value)}
                label="Categoría *"
              >
                {Categories.map((cat) => (
                  <MenuItem key={cat.category} value={cat.category}>
                    {cat.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Subcategoría */}
          <Grid item xs={6}>
            <FormControl fullWidth disabled={!formData.categoria}>
              <InputLabel>Subcategoría *</InputLabel>
              <Select
                value={formData.subcategoria}
                onChange={(e) => handleInputChange('subcategoria', e.target.value)}
                label="Subcategoría *"
              >
                {formData.categoria && Categories.find(cat => cat.category === formData.categoria)?.subcategories.map((sub) => (
                  <MenuItem key={sub} value={sub}>
                    {sub}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Descripción */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción *"
              value={formData.descripcion}
              onChange={(e) => handleInputChange('descripcion', e.target.value)}
              multiline
              rows={3}
            />
          </Grid>

          {/* Latitud y Longitud */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Latitud *"
              type="number"
              value={formData.latitud}
              onChange={(e) => handleInputChange('latitud', e.target.value)}
              inputProps={{ step: "0.000001" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Longitud *"
              type="number"
              value={formData.longitud}
              onChange={(e) => handleInputChange('longitud', e.target.value)}
              inputProps={{ step: "0.000001" }}
            />
          </Grid>

          {/* Fecha */}
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha"
                value={formData.fecha ? dayjs(formData.fecha) : null}
                onChange={(newValue) => handleInputChange('fecha', newValue ? newValue.format('YYYY-MM-DD') : '')}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>

          {/* URL de foto */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="URL de foto"
              value={formData.foto_url}
              onChange={(e) => handleInputChange('foto_url', e.target.value)}
              placeholder="https://ejemplo.com/foto.jpg"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditReport;
