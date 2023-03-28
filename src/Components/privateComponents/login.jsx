import "../styles/login.css";
import { useInitSession } from "../Controllers/fetch.js";
import { NavLink } from "react-router-dom";
export const Login = () => {
  const [isAuthenticated, fetchSession] = useInitSession();
  const id = "signin";

  const onSubmit = (e) => {
    e.preventDefault();
    fetchSession(id, e);
  };

  return (
    <div className="container containerForm">
      <div className="login-form ">
        <h2 className="text-center ">Iniciar sesión</h2>
        <form id={id} method="POST" onSubmit={(e) => onSubmit(e)}>
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
            <NavLink to="/recover" className="float-right login-link">
              ¿Olvidaste tu contraseña?
            </NavLink>
          </div>
        </form>
        <p className="text-center login-link">
          ¿No tienes una cuenta? <NavLink to="/signup">Regístrate aquí</NavLink>
        </p>
      </div>
    </div>
  );
};
