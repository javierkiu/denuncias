import { useFetchReports } from "../../hooks/useFetchReports";
import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Grid, IconButton, Menu } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewReport from "../../components/popups/ViewReport";
import DeleteReport from "../../components/popups/DeleteReport";
import Categories from "../home/Categories.json";

export const ReportPage = () => {
  const [filtro_categoria, setFiltroCategoria] = useState("");
  const [filtro_fecha_desde, setFiltroFechaDesde] = useState("");
  const [filtro_fecha_hasta, setFiltroFechaHasta] = useState("");
  const [filtro_subcategoria, setFiltroSubcategoria] = useState("");

  function refrescarCategoria(categoria){
    setFiltroSubcategoria("");
    setFiltroCategoria(categoria);
  }

  const [getReports, loading, error, reports] = useFetchReports();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos: {error.message}</p>;
  if (reports.length === 0) return <p>No hay denuncias registradas.</p>;

  function filtrar_categoria(filtro_categoria, lista) {
    if (!filtro_categoria) return lista;
    return lista.filter((denuncia) =>
      denuncia.categoria.toLowerCase().includes(filtro_categoria.toLowerCase())
    );
  }

  function filtrar_subcategoria(filtro_subcategoria, lista) {
    if (!filtro_subcategoria) return lista;
    return lista.filter((denuncia) =>
      denuncia.subcategoria
        .toLowerCase()
        .includes(filtro_subcategoria.toLowerCase())
    );
  }

  function filtrar_por_rango_fechas(desde, hasta, lista) {
    if (!desde && !hasta) return lista;
    return lista.filter((denuncia) => {
      const fechaDenuncia = new Date(denuncia.fecha.split(" ")[0]);
      const fechaDesde = desde ? new Date(desde) : null;
      const fechaHasta = hasta ? new Date(hasta) : null;
      if (fechaDesde && fechaHasta) {
        return fechaDenuncia >= fechaDesde && fechaDenuncia <= fechaHasta;
      } else if (fechaDesde) {
        return fechaDenuncia >= fechaDesde;
      } else if (fechaHasta) {
        return fechaDenuncia <= fechaHasta;
      }
      return true;
    });
  }

  function createData(id, categoria, fecha, subcategoria) {
    return { id, categoria, fecha, subcategoria };
  }

  // Filtrado combinado
  let filteredReports = filtrar_por_rango_fechas(
    filtro_fecha_desde,
    filtro_fecha_hasta,
    reports
  );
  filteredReports = filtrar_categoria(filtro_categoria, filteredReports);
  filteredReports = filtrar_subcategoria(filtro_subcategoria, filteredReports);

  const rows = filteredReports.map((denuncia) =>
    createData(
      denuncia.id,
      denuncia.categoria,
      denuncia.fecha.split(" ")[0],
      denuncia.subcategoria
    )
  );

  return (
    <Grid
      container
      spacing={2}
      style={{ padding: "20px", margin: "20px" }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {/* Titulo */}
      <Grid size={12} textAlign={"center"}>
        <Typography variant="h4" component="h1">
          Denuncias Registradas
        </Typography>
      </Grid>

      <Grid
        size={{ xs: 12, md: 8 }}
        container
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid container size= {12}>
          {/* FILTRO POR CATEGORIA */}
          <Grid size={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="filtro_categoria_label">
                Filtrar por categoría
              </InputLabel>
              <Select
                labelId="filtro_categoria_label"
                id="filtro_categoria"
                value={filtro_categoria}
                onChange={(e) => refrescarCategoria(e.target.value)}
              >
                {Categories.map((categoria) => (
                  <MenuItem key={categoria.category} value={categoria.category}>
                    {categoria.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* FILTRO POR SUBCATEGORIA */}
          <Grid size={6}>
            <FormControl fullWidth margin="normal" disabled={!filtro_categoria}>
              <InputLabel id="filtro_subcategoria_label">
                Filtrar por subcategoría
              </InputLabel>
              <Select
                labelId="filtro_subcategoria_label"
                id="filtro_subcategoria"
                value={filtro_subcategoria}
                onChange={(e) => setFiltroSubcategoria(e.target.value)}
              >
                {Categories.find((categoria) => {
                  return categoria.category.includes(filtro_categoria);
                }).subcategories.map((sub) => 
                  <MenuItem key={sub} value={sub}>
                    {sub}
                  </MenuItem>
                )}

              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid size={{ xs: 4, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={filtro_fecha_desde ? dayjs(filtro_fecha_desde) : null}
              onChange={(newValue) =>
                setFiltroFechaDesde(
                  newValue ? newValue.format("YYYY-MM-DD") : ""
                )
              }
              label="Fecha desde"
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={{ xs: 4, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={filtro_fecha_hasta ? dayjs(filtro_fecha_hasta) : null}
              onChange={(newValue) =>
                setFiltroFechaHasta(
                  newValue ? newValue.format("YYYY-MM-DD") : ""
                )
              }
              label="Fecha hasta"
            />
          </LocalizationProvider>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Categoría</TableCell>
                <TableCell>Subcategoría</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.categoria}</TableCell>
                  <TableCell>{row.subcategoria}</TableCell>
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell align="center">
                    <ViewReport
                      denuncia={
                        reports.filter((denuncia) => denuncia.id === row.id)[0]
                      }
                    />{" "}
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>{" "}
                    <DeleteReport id={row.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="outlined"
          onClick={() => {
            getReports();
          }}
        >
          Recargar Denuncias
        </Button>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginTop: "10px" }}
        >
          Total de denuncias: {filteredReports.length}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginTop: "10px" }}
        >
          Última actualización: {new Date().toLocaleString()}
        </Typography>
      </Grid>
    </Grid>
  );
};
