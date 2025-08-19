import { Box, Button, IconButton, Typography } from "@mui/material";
import { useRef, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

export const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setUploadStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }

  const uploadFile = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload.php`, {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const result = await response.json();
        setUploadStatus({
          type: "success",
          message: "Image uploaded successfully",
          data: result
        })
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
      }
    } catch (error) {
        setUploadStatus({
          type: "error",
          message: error.message
        });
        console.error("Error uploading image to the backend: ", error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 360,
        margin: '0 auto',
      }}
    >
      <Box
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        sx={{
          width: "100%",
          minWidth: "100%",
          boxSizing: "border-box",
          border: "2px dashed #FACC15",
          bgcolor: "#FEFCE8",
          padding: "2.5rem 1.25rem",
          borderRadius: "2",
          textAlign: "center",
          cursor: "pointer"
        }}
      >
        <input 
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{display: "none"}}
        />
        {selectedFile ? (
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                color: "#059669",
                mb: 2,
                fontSize: ".875rem"
              }}
            >
              {selectedFile.name}
            </Typography>
            <Button
              variant="contained"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                textTransform: "none",
                bgcolor: "#FACC15",
                color: "#000",
                fontWeight: 400,
                mr: 1,
                ":hover": { bgcolor: "#EAB308" }
              }}
            >
              Elige otra foto
            </Button>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                clearFile();
              }}
            >
              <ClearIcon />
            </IconButton>
          </Box>
        ) : (
          <Box>
            <Typography
              variant="body1"
              sx={{ fontFamily: "'Poppins', sans-serif", color: "#666", mb: 2 }}
            >
              Da click o arrastra para subir una foto
            </Typography>
            <Button
              variant="contained"
              sx={{
                fontFamily: "'Poppins', sans-serif",
                textTransform: "none",
                bgcolor: "#FACC15",
                fontWeight: 400,
                color: "#000",
                ":hover": { bgcolor: "#EAB308" }
              }}
            >
              Toma o elige una foto existente
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}
