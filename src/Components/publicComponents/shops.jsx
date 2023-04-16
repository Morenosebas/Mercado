import { useState, useEffect } from "react";
import "../styles/shopList.css";
import { Footer } from "./footer";
export const ShopPublicList = ({ shopList }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(shopList);
    shopList ? setLoading(false) : setLoading(true);
  }, [shopList]);

  if (!loading) {
    return (
      <>
        <div
          className="container d-flex align-items-start justify-content-center position-relative"
          style={{
            top: 80,
            width: "100%",
            zIndex: 0,
            flexWrap: "wrap",
            marginBottom: "70px",
          }}
        >
          {shopList.map((element) => (
            <div
              className="card flex-column bg-dark align-items-center ssScroll"
              style={{
                width: "220px",
                height: "220px",
                marginLeft: "30px",
                marginBottom: "30px",
                overflowY: "auto",
                overflowX: "hidden",
                color: "white",
              }}
              key={element._id}
            >
              <div className="card-header d-flex fw-bolder flex-column align-items-center">
                {element.name} <br />
                <small style={{ fontSize: "10px", color: "white" }}>
                  {element.category}
                </small>
              </div>
              <img
                src={`http://localhost:5000${element.image.path}`}
                alt="logo imagen"
                className="card-img-top"
                style={{ width: "200px", height: "200px" }}
              />
              {/* <div className="card-body">
              <div style={{ fontSize: "13px" }}>{element.description}</div>
            </div> */}
            </div>
          ))}
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <div
        className="container-fluid d-flex flex-column align-items-center justify-content-center position-absolute"
        style={{ height: "100%" }}
      >
        <div
          className="spinner-border text-danger"
          style={{ marginBottom: "20px" }}
          role="status"
        />
        <span className="fw-bolder">Cargando...</span>
      </div>
    );
  }
};
