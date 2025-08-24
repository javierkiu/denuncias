import { Box, Grid, Typography } from "@mui/material";
import contaminacion from "../../assets/contaminacion_aire.jpg";
import incendio_forestal from "../../assets/incendio_forestal.jpeg";
import mineria_ilegal from "../../assets/mineria_ilegal.jpeg";
import flora_fauna from "../../assets/flora_fauna.jpg";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import CardReport from "../../components/CardReport";
import { Button } from "@mui/material";

export const HomePage = () => {
  const navigate = useNavigate();
  const handleReportCategory = (category) => {
    navigate('/fill-report', {state: category});
  }

  return (
    <Grid container spacing={5} justifyContent={"center"}>
      <Grid size={12} sx={{ padding: 0, height: "400px" }}>
        <Box
          sx={{
            backgroundImage: `url(${incendio_forestal})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {/* FONDO OSCURO */}
          <Box
            width={"100%"}
            height={"400px"}
            sx={{
              backgroundColor: "black",
              opacity: 0.8,
              top: 0,
            }}
          />

          {/* CONTENIDO ENCIMA */}
          <Box
            width={"100%"}
            height={"100%"}
            sx={{
              position: "absolute",
              top: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant={"h4"}
              component={"h1"}
              textAlign={"center"}
              color="white"
              fontWeight={"bold"}
            >
              Denuncias ambientales
            </Typography>
            <Typography
              variant={"body2"}
              component={"h1"}
              textAlign={"center"}
              color="white"
            >
              Nuestra plataforma te permite reportar contaminación, incendios
              forestales, minería ilegal y otras amenazas al ambiente para que
              las autoridades puedan actuar a tiempo.
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "200px" }}
              color="success"
              href="#categorias"
            >
              Ver categorías
            </Button>
          </Box>
        </Box>
      </Grid>

      {/* CATEGORIAS */}
      <Grid container size={10} paddingInline={"50px"} id="categorias">
        <Grid size={12}>
          <Typography
            textAlign={"center"}
            variant="h5"
            fontWeight={"bold"}
            color="#2e7d32"
            letterSpacing={3}
          >
            Reporta tu denuncia en cualquiera de estas categorías!
          </Typography>
          <Divider sx={{ borderColor: "#2e7d32" }} />
        </Grid>

        {/* Tarjeta Contaminacion */}
        <Grid size={3}>
          <CardReport
                  image={contaminacion}
                  title="Contaminación"
                  description="Denuncia casos de basura en la vía pública, ríos o mares, o contaminación de aire."
                  onClick={handleReportCategory}
          />
        </Grid>

        {/* Tarjeta Incendios forestales */}
        <Grid size={3}>
          <CardReport
                  image={incendio_forestal}
                  title="Incendio forestal"
                  description="Denuncia casos como quema de pastizales, incendios activos o fuego provocados por actividades humanas."
                  onClick={handleReportCategory}
          />
        </Grid>

        {/* Tarjeta Mineria ilegal */}
        <Grid size={3}>
          <CardReport
                  image={mineria_ilegal}
                  title="Mineria ilegal"
                  description="Denuncia casos como uso de maquinarias en río, extracción de minerales sin permiso, tala asociada a minería y similares."
                  onClick={handleReportCategory}
          />  
        </Grid>

        {/* Tarjeta Proteccion de flora y fauna */}
        <Grid size={3}>
          <CardReport
                  image={flora_fauna}
                  title="Flora y fauna"
                  description="Denuncia casos como caza ilegal, tráfico de especies, tala ilegal de árboles o daño a áreas protegidas."
                  onClick={handleReportCategory}
          />            
        </Grid>
      </Grid>
    </Grid>
  );
};
