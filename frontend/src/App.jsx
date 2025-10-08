import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [vehiculos, setVehiculos] = useState([]);
  const [placa, setPlaca] = useState("");

  const getVehiculos = async () => {
    const res = await axios.get("http://localhost:4000/api/vehiculos");
    setVehiculos(res.data);
  };

  const addVehiculo = async () => {
    if (!placa) return alert("Ingrese una placa");
    await axios.post("http://localhost:4000/api/vehiculos", { placa });
    setPlaca("");
    getVehiculos();
  };

  const registrarSalida = async (id) => {
    await axios.put(`http://localhost:4000/api/vehiculos/${id}`);
    getVehiculos();
  };

  const eliminarVehiculo = async (id) => {
    await axios.delete(`http://localhost:4000/api/vehiculos/${id}`);
    getVehiculos();
  };

  useEffect(() => {
    getVehiculos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🚗 Control de Parqueadero</h1>
      <input
        value={placa}
        onChange={(e) => setPlaca(e.target.value)}
        placeholder="Placa del vehículo"
      />
      <button onClick={addVehiculo}>Registrar Ingreso</button>

      <table border="1" style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Hora Entrada</th>
            <th>Hora Salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.placa}</td>
              <td>{v.hora_entrada}</td>
              <td>{v.hora_salida || "En parqueadero"}</td>
              <td>
                <button onClick={() => registrarSalida(v.id)}>Salida</button>
                <button onClick={() => eliminarVehiculo(v.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
