import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { alertaConfirmar } from "../helpers/funciones";
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
  let filtradoUsuarios = filtrarEnviosUsuario()

  function eliminarEnvio(id) {
    alertaConfirmar(id, apiEnvios,getEnvios )
  }

  return (
    <div className="cards">
      {
        filtradoUsuarios.map((item) => (
          <div className="card">
            <p>Id Envio: {item.idEnvio}</p>
            <p>Producto: {item.producto}</p>
            <p>Destino: {item.destino}</p>
            <p>Usuario: {usuarioLogueado.nombre}</p>
            <div className="card__buttons">
              <button onClick={() => eliminarEnvio(item.id)} className="card__button">Eliminar</button>
              <Link className="card__button">Editar</Link>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default GestionEnvios