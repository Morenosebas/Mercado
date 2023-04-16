import "../styles/Index.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Footer } from "./footer";
import { addCart as addCartReducer } from "../../Redux/slice/user";

export const Index = ({ allProducts }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    allProducts ? setLoading(false) : setLoading(true);
    setCart(state.session.cart || []);
  }, [allProducts, state.session.cart]);

  const addCart = function () {
    const productProps = allProducts.find((item) => item._id === selectedId);
    const { _id, name, price } = productProps;
    const product = { _id, name, price, quantity: 1 };
    const equalProductIndex = cart.findIndex((item) => item?._id === product._id);
    if (equalProductIndex >= 0) {
      const equalProduct = cart[equalProductIndex];
      const updatedProduct = { ...equalProduct, quantity: equalProduct.quantity + 1 };
      const newCart = [...cart];
      newCart[equalProductIndex] = updatedProduct;
      setCart(newCart);
      dispatch(addCartReducer({ cart: newCart }));
    } else {
      const newCart = [...cart, product];
      setCart(newCart);
      dispatch(addCartReducer({ cart: newCart }));
    }
    
  };



  if (loading) {
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
  } else {
    return (
      <>
        <motion.div
          className={
            selectedId ? "container bg-dark" : "container bg-dark principal"
          }
        >
          <motion.div
            className={
              selectedId === null
                ? "container contproducts"
                : "container contproducts darkeffect"
            }
          >
            {allProducts.map((item) => (
              <motion.div
                initial={{ opacity: 0, y: 0, width: "100%" }}
                animate={{ opacity: 1, y: 0, width: "33%" }}
                transition={{
                  duration: 0.1,
                  stiffness: 2000,
                  type: "keyframes",
                  delay: 1,
                  ease: "circInOut",
                }}
                key={item._id}
                className="contIndex"
                layoutId={item._id}
                onClick={() => setSelectedId(item._id)}
              >
                <motion.div
                  className="card align-items-center "
                  style={{ width: "270px", height: "240px" }}
                >
                  <motion.img
                    src={`http://localhost:5000${item.img.path}`}
                    className="card-img-top"
                    alt="..."
                    style={{ width: "270px", height: "240px" }}
                  />
                  <motion.div className="card-body ">
                    <motion.p style={{ color: "#000" }} className="card-text">
                      {item.name}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedId && (
              <motion.div
                className="despl"
                transition={{
                  type: "keyframes",
                  duration: 0.6,
                  mass: 0.2,
                  stiffness: 300,
                  damping: 20,
                }}
                layoutId={selectedId}
              >
                <motion.div
                  className="container select"
                  layoutId={allProducts.find((item) => item._id === selectedId)}
                >
                  <motion.div
                    onClick={() => setSelectedId(null)}
                    className="exit"
                  >
                    x
                  </motion.div>
                  <motion.img
                    className="imgContainer col-12 col-md-6"
                    src={`${`http://localhost:5000${allProducts.find((item) => item._id === selectedId).img
                      .path
                      }`}`}
                  />
                  <motion.div
                    style={{ margin: "5px" }}
                    className="card-body position-relative"
                  >
                    <motion.h5
                      style={{ margin: "3px", color: "white" }}
                      className="card-title"
                    >
                      {allProducts.find((item) => item._id === selectedId).name}
                    </motion.h5>
                    <motion.h6
                      style={{ margin: "5px" }}
                      className="card-subtitle mb-2 text-muted"
                    >
                      {
                        allProducts.find((item) => item._id === selectedId)
                          .category
                      }
                    </motion.h6>
                    <motion.p style={{ margin: "5px" }} className="card-text">
                      {
                        allProducts.find((item) => item._id === selectedId)
                          .description
                      }
                    </motion.p>
                    <button className="btn btn-success">
                      <NavLink href="#" className={"btn-buynow"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-cart-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        Comprar
                      </NavLink>
                    </button>
                    <button
                      href="#"
                      style={{ margin: "5px" }}
                      className="btn btn-primary"
                      onClick={addCart}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-cart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                      Agregar al carrito
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <Footer />
      </>
    );
  }
};
