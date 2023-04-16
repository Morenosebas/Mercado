import "../styles/footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer__container">
        <div className="footer__container__left">
          <div
            className="h1 fw-bolder"
            style={{ fontFamily: "cursive", color: "#d70505" }}
          >
            FastEats
          </div>
          <div className="h6">
            <p>
              FastEats es una empresa dedicada al servicio de delivery online
              que se especializa en ofrecer comida rápida y saludable a sus
              clientes. La empresa cuenta con una plataforma fácil de usar que
              permite a los clientes realizar pedidos en línea y recibir su
              comida en la comodidad de su hogar u oficina.
            </p>
          </div>
        </div>
        <div className="footer__container__right">
          <div className="footer__container__right__title footer__container__right__links">
            <h2 style={{ marginTop: "20px" }}>Links</h2>
          </div>
          <div className="footer__container__right__links">
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/Products">Productos</Link>
              </li>
              <li>
                <Link to="/Shops">Tiendas</Link>
              </li>
              <li>
                <Link to="/Servicios">Servicios</Link>
              </li>
              <li>
                <Link to="/Contactanos">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
