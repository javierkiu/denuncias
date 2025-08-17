import { useFetchReports } from "../../hooks/useFetchReports"
import { useEffect, useState } from "react"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { TextField, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Button } from "@mui/material";

export const ReportPage = () => {
    const [filtro_categoria, setFiltroCategoria] = useState("");
    const [filtro_fecha, setFiltroFecha] = useState("");
    const [filtro_descripcion, setFiltroDescripcion] = useState("");
    console.log(filtro_fecha)
    const categorias = [
        "Contaminación",
        "Incendios forestales",
        "Minería ilegal",
        "Protección de flora y fauna",
    ]

    const [getReports, loading, error, reports] = useFetchReports();
    
    if (loading) return <p>Cargando...</p>
    if (error) return <p>Error al cargar los datos: {error.message}</p>
    if (reports.length === 0) return <p>No hay denuncias registradas.</p>
    
    function filtrar_categoria(filtro_categoria){
        return reports.filter(denuncia => 
            denuncia.categoria.toLowerCase().includes(filtro_categoria.toLowerCase())
        );
    }
    
    function filtrar_menores_fecha(filtro_fecha){
        if (!filtro_fecha) return reports;
        return reports.filter(denuncia =>
            new Date(denuncia.fecha.split(" ")[0]) <= new Date(filtro_fecha)
        );
    }


    function createData(categoria, fecha, descripcion) {
        return { categoria, fecha, descripcion };
    }
    const filter_report = filtrar_categoria(filtro_categoria);
    const rows = filter_report.map(denuncia => 
        createData(denuncia.categoria, denuncia.fecha.split(" ")[0], denuncia.descripcion)
    );
    

    return (
        <div style={{width: "80%", margin: "0 auto", textAlign: "center"}}>
            <Typography variant="h4" component="h1" >
                Denuncias Registradas
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="filtro_categoria_label">Filtrar por categoría</InputLabel>
                <Select
                    labelId="filtro_categoria_label"
                    id="filtro_categoria"
                    value={filtro_categoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                >
                    {categorias.map((categoria) => (
                        <MenuItem key={categoria} value={categoria}>
                            {categoria}
                        </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        value={filtro_fecha ? dayjs(filtro_fecha) : null}
                        onChange={(newValue) => setFiltroFecha(newValue ? newValue.format('YYYY-MM-DD') : "")}
                        label="Filtrar por fecha"
                    />
            </LocalizationProvider>   
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setFiltroFecha(dayjs().format('YYYY-MM-DD'))}
            >
                Sumbit
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Descripción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.categoria}</TableCell>
                                <TableCell>{row.fecha}</TableCell>
                                <TableCell>{row.descripcion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <button onClick={getReports}>Recargar Denuncias</button>
            <p>Total de denuncias: {reports.length}</p>
            <p>Última actualización: {new Date().toLocaleString()}</p>
        </div>
    )
}
