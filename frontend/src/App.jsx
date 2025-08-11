import { useEffect, useState } from "react";

function App() {
  const [denuncias, setDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/denuncias.php")
      .then(res => res.json())
      .then(data => {
        setDenuncias(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Denuncias</h1>
      <ul>
        {denuncias.map(denuncia => (
          <li key={denuncia.id}>
            <b>Tipo:</b> {denuncia.tipo}<br /> 
            <b>Ubicacion: </b>{denuncia.ubicacion} <br />
            <b>Descripcion: </b>{denuncia.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
