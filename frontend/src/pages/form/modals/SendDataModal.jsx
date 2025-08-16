import { Box, Modal, Typography } from "@mui/material"
import { CancelButton } from "../../../components/buttons/CancelButton"
import { ConfirmButton } from "../../../components/buttons/ConfirmButton"

export const SendDataModal = ({handleOpenModal, handleCloseModal, handleConfirmation, isConfirmed}) => {
  return (
    <Modal open={handleOpenModal} onClose={handleCloseModal}>
        <Box 
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                bgcolor: "background.paper",
                boxShadow: "none",
                p: {xs: 4 , md: 5},
                borderRadius: 2,
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: .5,
                width: {
                    xs: "75vw",
                    sm: "22rem",
                    md: "22rem"
                },
                maxWidth: "100%"
            }}
        >
            <Typography 
                variant="h4"
                component="h4"
                sx={{
                    fontFamily:"'Poppins', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#8E8E8E",
                    p: 0,
                    mb: isConfirmed ? 0 :"1.25rem"
                }}
            >
                {isConfirmed ? "Denuncia enviada exitosamente" : "¿Estás seguro de enviar la denuncia?"}
            </Typography>
            {!isConfirmed && 
                <Box sx={{
                display: "flex",
                gap: 3,
                alignItems: "center"
                }}>
                    <CancelButton handleCancel={handleCloseModal}/>
                    <ConfirmButton handleConfirmation={handleConfirmation}/>
                </Box>
            }
        </Box>
    </Modal>
  )
}