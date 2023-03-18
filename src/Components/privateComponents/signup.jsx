import "../styles/login.css";

export const SignUp = () => {
  return (
    <div className="container containerForm">
      <div className="login-form ">
        <h1 className="text-center ">Registrate</h1>
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
            <label htmlFor="pass">Contraseña</label>
            <input
              id="pass"
              type="password"
              className="form-control"
              placeholder="Contraseña"
              required="required"
            />
            <label htmlFor="repeat-pass">Repite la contraseña</label>
            <input
              id="repeat-pass"
              type="password"
              className="form-control"
              placeholder="Contraseña"
              required="required"
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
            <a href="#" className="float-right login-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
        <p className="text-center login-link">
          ¿Tienes una cuenta? <a href="#">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
};
