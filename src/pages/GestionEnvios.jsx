import { useEffect, useState } from "react";
let apiEnvios = "https://back-json-server-martes.onrender.com/envios";
const GestionEnvios = () => {
  let usuarioLogueado = JSON.parse(localStorage.getItem("usuario"))
  const [envios, setEnvios] = useState([]);
  function getEnvios() {
    fetch(apiEnvios)
      .then((response) => response.json())
      .then((data) => setEnvios(data));
  }
  useEffect(() => {
    getEnvios();
  }, []);

  function filtrarEnviosUsuario() {
    let filtroEnvios = envios.filter((item) => item.usuarioId == usuarioLogueado.id)
    return filtroEnvios
  }

  return (
    <div>GestionEnvios</div>
  )
}

export default GestionEnvios