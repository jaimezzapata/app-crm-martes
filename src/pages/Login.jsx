import { useEffect, useState } from "react";
import { alerta, generarToken, generarId } from "../helpers/funciones";
import { useNavigate } from "react-router-dom";
import "./Login.css";
let apiUsuarios = "https://back-json-server-martes.onrender.com/usuarios";

function Login() {
  const [getUser, setUser] = useState();
  const [getPassword, setPassword] = useState();
  const [getEmail, setEmail] = useState();
  const [getName, setName] = useState();
  const [usuarios, setUsuarios] = useState([]);
  let redireccion = useNavigate();

  function getUsuarios() {
    fetch(apiUsuarios)
      .then((response) => response.json())
      .then((data) => setUsuarios(data));
  }
  useEffect(() => {
    getUsuarios();
  }, []);

  function buscarUsuario() {
    let usuario = usuarios.find(
      (item) => getUser === item.usuario && getPassword === item.contrasena
    );
    return usuario;
  }
  function iniciarSesion() {
    if (buscarUsuario()) {
      let tokenAcceso = generarToken();
      localStorage.setItem("token", tokenAcceso);
      localStorage.setItem("usuario", JSON.stringify(buscarUsuario()));
      alerta("Bienvenido", "Acceso al sistema", "success");
      redireccion("/home");
    } else {
      alerta("Error", "Error de credenciales", "error");
    }
  }

  function registrarUsuario() {
    let usuarioNuevo = {
      id: generarId(),
      nombre: getName,
      usuario: getUser,
      contrasena: getPassword,
      correo: getEmail,
    };
    let auth = usuarios.some(
      (item) => item.usuario == getUser || item.correo == getEmail
    );
    if (auth) {
      alerta("Error", "Usuario ya existe en la base de datos", "error");
    } else {
      fetch(apiUsuarios, {
        method: "POST",
        body: JSON.stringify(usuarioNuevo),
      }).then(() => {
        alerta("Correcto", "Usuario registrado correctamente", "success");
        getUsuarios();
      });
    }
  }

  return (
    <div className="container">
      <input id="signup_toggle" type="checkbox" />
      <form className="form">
        <div className="form_front">
          <div className="form_details">Login</div>
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            className="input"
            placeholder="Username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className="input"
            placeholder="Password"
          />
          <button type="button" onClick={iniciarSesion} className="btn">
            Login
          </button>
          <span className="switch">
            Don't have an account?
            <label for="signup_toggle" className="signup_tog">
              Sign Up
            </label>
          </span>
        </div>
        <div className="form_back">
          <div className="form_details">SignUp</div>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="input"
            placeholder="Firstname"
          />
          <input
            onChange={(e) => setUser(e.target.value)}
            type="text"
            className="input"
            placeholder="Username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className="input"
            placeholder="Password"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="input"
            placeholder="Email"
          />
          <button type="button" onClick={registrarUsuario} className="btn">
            Signup
          </button>
          <span className="switch">
            Already have an account?
            <label for="signup_toggle" className="signup_tog">
              Sign In
            </label>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
