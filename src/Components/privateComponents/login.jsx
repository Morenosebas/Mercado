import "../styles/login.css";
import { useInitSession } from "../Controllers/fetch.js";

export const Login = () => {

  const [isAuthenticated, fetchSession] = useInitSession();
  const id = "signin";

  const onSubmit = (e) => {
    e.preventDefault();
    fetchSession(id,e);
  };

  return (
    <div className="container containerForm">
      <div className="login-form ">
        <h2 className="text-center ">Iniciar sesión</h2>
        <form id={id} method="POST" onSubmit={onSubmit}  >
          <div className="form-group ">
            <input
              name="username"
              type="text"
              className="form-control"
              placeholder="Correo electrónico"
              required="required"
            />
          </div>
          <div className="form-group padgrp">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              name="password"
              required="required"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-danger btn-block">
              Iniciar Sesión
            </button>
          </div>
          <div className="clearfix">
            <label className="float-left checkbox-inline">
              <input type="checkbox" /> Recordarme
            </label>
            <a href="/signup" className="float-right login-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
        <p className="text-center login-link">
          ¿No tienes una cuenta? <a href="#">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};
