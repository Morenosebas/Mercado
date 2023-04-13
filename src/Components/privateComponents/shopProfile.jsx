import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
export const ShopProfile = () => {
  const { idShop } = useParams();
  const [shop, setShop] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/shops/${idShop}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setShop(data);
        setLoad(false);
      });
  }, []);
  console.log(shop);

  if (load) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div
      className="position-absolute justify-content-center d-flex align-items-center w-100 h-100"
      style={{ zIndex: -1,}}
    >
      <div className="card bg-dark mb-3 ssScroll" style={{ maxWidth: "640px",maxHeight:"500px",top:"5%" }}>
        <div className="row g-0 ">
          <div className="col-md-4">
            <div className="justify-content-center d-flex align-items-center w-100 h-100 p-1  ">
              <img
                src={`http://localhost:5000${shop.image.path}`}
                className="img-fluid rounded-center"
                alt="Logo"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body bg-light">
              <h5 className="card-title fw-bolder  ">{shop.name}</h5>
              <p className="card-text text-dark">{shop.description}</p>
              <div className="card-text" style={{overflow:"auto"}}>
                <section
                  className="d-flex align-items-center p-1 col"
                  style={{ backgroundColor: "#D90202", borderRadius: "5px" }}
                >
                  <div
                    className="card-text row  fw-bolder m-2"
                    style={{ color: "white" }}
                  >
                    Productos - {shop.products.length}
                    <div className="m-2 bg-dark" style={{overflow: "auto",maxWidth:"100%",maxHeight:"200px",outline:"1px solid #000" }}>
                      {shop.products.map((product) => {
                        return (
                          <div
                            className="card bg-dark rounded-center d-flex border-secondary"
                            style={{ border: "2px solid" }}
                            key={product._id}
                          >
                            <small
                              className="card-text fw-light m-1"
                              style={{
                                color: "#fff",
                                overflow: "hidden",
                              }}
                            >
                              {product.name}
                            </small>
                            <img
                              src={`http://localhost:5000${product.img.path}`}
                              className="img-fluid rounded-center w-100"
                              alt="Producto imagen"
                              style={{ width: "50px", overflow: "hidden" }}
                            />
                            <span
                              className="text-end m-1 position-relative "
                              style={{ color: "#fff" }}
                            >
                              ${product.price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <p
                      className="position-relative "
                      style={{ marginTop: "25px" }}
                    >
                      <button
                        className="btn btn-dark p-2"
                        style={{ fontSize: "10px", flexWrap: "wrap" }}
                      >
                        <NavLink
                          className={"text-decoration-none"}
                          style={{ color: "white" }}
                          to={`/shop/${idShop}/addproduct`}
                        >
                          Añadir Producto
                        </NavLink>
                      </button>
                    </p>
                  </div>
                </section>
                <small className="text-muted">
                  Direccion: {shop.direccion}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
