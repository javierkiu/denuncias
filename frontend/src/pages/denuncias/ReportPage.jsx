import { useFetchReports } from "../../hooks/useFetchReports"

export const ReportPage = () => {
    const [getReports, loading, error, reports] = useFetchReports();

    if (loading) return <p>Cargando...</p>

    return (
        <div>
            <h1>Denuncias</h1>
            <ul>
                {reports.map(denuncia => (
                <li key={denuncia.id}>
                    <b>Tipo:</b> {denuncia.tipo}<br /> 
                    <b>Ubicacion: </b>{denuncia.ubicacion} <br />
                    <b>Descripcion: </b>{denuncia.descripcion}
                </li>
                ))}
            </ul>
        </div>
    )
}
