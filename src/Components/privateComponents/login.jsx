import "../styles/login.css";

export const Login = () => {
  return (
    <div className="container containerForm">
      <div className="login-form ">
        <h2 className="text-center ">Iniciar sesión</h2>
        <form>
          <div className="form-group ">
            <input
              type="email"
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
            <a href="#" className="float-right login-link">
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
