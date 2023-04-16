import "../styles/login.css";
import { useInitSession } from "../Controllers/fetch.js";
import { NavLink } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import { useState } from "react";

//falta validar que al repetir la contraseña si inicie session
export const SignUp = () => {
  const [isAuthenticated, fetchSession, error, setError] = useInitSession();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const id = "signup";
  const onSubmit = (e) => {
    e.preventDefault();
    fetchSession(id, e);
  };
  const validatePassword = function (e) {
    const repeatPassword = e.target.value;
    if (password.length > 7 && repeatPassword.length > 7) {
      repeatPassword === password
        ? setError(null)
        : setError("Las contraseñas no coinciden");
      if (error) {
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 6000);
      } else setShow(false);
    }
  };
  return (
    <div className="container containerForm">
      <div className="login-form ">
        <h1 className="text-center ">Registrate</h1>
        <form
          id={id}
          method="POST"
          onSubmit={
            error
              ? (e) => {
                  e.preventDefault();
                  setShow(true);
                  setTimeout(() => {
                    setShow(false);
                  }, 3000);
                }
              : onSubmit
          }
        >
          <div className="form-group ">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Correo electrónico"
              required="required"
            />
          </div>
          <div className="form-group padgrp">
            <label htmlFor="pass">Contraseña</label>
            <input
              id="password"
              type="password"
              className="form-control"
              name="password"
              placeholder="Contraseña"
              required
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="repeat-pass">Repite la contraseña</label>
            <input
              id="repeat-pass"
              type="password"
              className="form-control"
              placeholder="Contraseña"
              required
              onChange={validatePassword}
              minLength={8}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-danger btn-block">
              Crear Cuenta
            </button>
          </div>
          <div className="clearfix">
            <label className="float-left checkbox-inline">
              <input type="checkbox" /> Recordarme
            </label>
          </div>
        </form>
        <p className="text-center login-link">
          ¿Tienes una cuenta? <NavLink to="/signin">Inicia sesión aquí</NavLink>
        </p>
      </div>
      {error && (
        <Toast
          className="bg-dark"
          onClose={() => setShow(false)}
          show={show}
          delay={10000}
          autohide
          style={{
            position: "fixed",
            right: 0,
            bottom: 20,
            color: "#fff",
          }}
        >
          <Toast.Header className="bg-dark">
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong
              style={{ color: "red", fontWeight: "bold" }}
              className="me-auto"
            >
              Error!
            </strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      )}
    </div>
  );
};
