import { useState, useEffect } from "react";
import "../styles/shopList.css";
export const ShopPublicList = ({ shopList }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    shopList ? setLoading(false) : setLoading(true);
  }, [shopList]);

  if (!loading) {
    return (
      <div
        className="container d-flex align-items-start justify-content-center position-relative"
        style={{
          top: 80,
          width: "100%",
          zIndex: 0,
          flexWrap: "wrap",
        }}
      >
        {shopList.map((element) => (
          <div
            className="card ssScroll"
            style={{
              width: "200px",
              height: "320px",
              marginLeft: "30px",
              marginBottom: "30px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
            key={element._id}
          >
            <div className="card-header d-flex fw-bolder flex-column align-items-center">
              {element.name} <br />
              <small className="text-muted" style={{ fontSize: "10px" }}>
                {element.category}
              </small>
            </div>
            <img
              src={`http://localhost:5000${element.image.path}`}
              alt="logo imagen"
              className="card-img-top"
              style={{ width: "200px", height: "200px" }}
            />
            <div className="card-body">
              <div style={{ fontSize: "13px" }}>{element.description}</div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
};
