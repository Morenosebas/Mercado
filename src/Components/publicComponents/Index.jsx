import "../styles/Index.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
const items = [
  {
    id: 1,
    img: "https://st2.depositphotos.com/5002805/8206/i/950/depositphotos_82066396-stock-photo-mixed-topping-pizza.jpg",
    title: "Pizza Hawaina",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae consequuntur ab, velit voluptates quos corporis maxime aperiam hic aut nobis fugiat autem suscipit error doloribus nihil dolores vel neque quaerat",
  },
  {
    id: 2,
    img: "https://cdn.colombia.com/gastronomia/2011/08/25/pizza-margarita-3684.jpg",
    title: "Pizza carbonara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae consequuntur ab, velit voluptates quos corporis maxime aperiam hic aut nobis fugiat autem suscipit error doloribus nihil dolores vel neque quaerat",
  },
  {
    id: 3,
    img: "https://napolicartagena.com/wp-content/uploads/2022/01/La-Pizza-Hawaiana-de-Canada.jpg",
    title: "Pizza mixta",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae consequuntur ab, velit voluptates quos corporis maxime aperiam hic aut nobis fugiat autem suscipit error doloribus nihil dolores vel neque quaerat",
  },
  {
    id: 4,
    img: "https://st2.depositphotos.com/5002805/8206/i/950/depositphotos_82066396-stock-photo-mixed-topping-pizza.jpg",
    title: "Pizza Hawaina",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae consequuntur ab, velit voluptates quos corporis maxime aperiam hic aut nobis fugiat autem suscipit error doloribus nihil dolores vel neque quaerat",
  },
  {
    id: 5,
    img: "https://cdn.colombia.com/gastronomia/2011/08/25/pizza-margarita-3684.jpg",
    title: "Pizza carbonara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae consequuntur ab, velit voluptates quos corporis maxime aperiam hic aut nobis fugiat autem suscipit error doloribus nihil dolores vel neque quaerat",
  },
  {
    id: 6,
    img: "https://napolicartagena.com/wp-content/uploads/2022/01/La-Pizza-Hawaiana-de-Canada.jpg",
    title: "Pizza mixta",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae consequuntur ab, velit voluptates quos corporis maxime aperiam hic aut nobis fugiat autem suscipit error doloribus nihil dolores vel neque quaerat",
  },
  {
    id: 7,
    img: "https://st2.depositphotos.com/5002805/8206/i/950/depositphotos_82066396-stock-photo-mixed-topping-pizza.jpg",
    title: "Pizza Hawaina",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae consequuntur ab, velit voluptates quos corporis maxime aperiam hic aut nobis fugiat autem suscipit error doloribus nihil dolores vel neque quaerat",
  },
  {
    id: 8,
    img: "https://cdn.colombia.com/gastronomia/2011/08/25/pizza-margarita-3684.jpg",
    title: "Pizza carbonara",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae consequuntur ab, velit voluptates quos corporis maxime aperiam hic aut nobis fugiat autem suscipit error doloribus nihil dolores vel neque quaerat",
  },
  {
    id: 9,
    img: "https://napolicartagena.com/wp-content/uploads/2022/01/La-Pizza-Hawaiana-de-Canada.jpg",
    title: "Pizza mixta",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae consequuntur ab, velit voluptates quos corporis maxime aperiam hic aut nobis fugiat autem suscipit error doloribus nihil dolores vel neque quaerat",
  },
];
export const Index = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <motion.div className="container principal">
        <motion.div className="container contproducts">
          {items.map((item) => (
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
              key={item.id}
              className="contIndex"
              layoutId={item.id}
              onClick={() => setSelectedId(item.id)}
            >
              <motion.div className="card " style={{ width: "18rem" }}>
                <motion.img
                  src={`${item.img}`}
                  className="card-img-top"
                  alt="..."
                />
                <motion.div className="card-body ">
                  <motion.p style={{ color: "#000" }} className="card-text">
                    {item.title}
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
                duration: 0.8,
                mass: 0.5,
                stiffness: 300,
                damping: 20,
              }}
              layoutId={selectedId}
            >
              <motion.div
                className="select"
                layoutId={items.find((item) => item.id === selectedId)}
              >
                <motion.div
                  onClick={() => setSelectedId(null)}
                  className="exit"
                >
                  x
                </motion.div>
                <motion.img
                  className="imgContainer col-6"
                  src={`${items.find((item) => item.id === selectedId).img}`}
                />
                <motion.div style={{ margin: "5px" }} className="card-body">
                  <motion.h5 style={{ margin: "5px" }} className="card-title">
                    {items.find((item) => item.id === selectedId).title}
                  </motion.h5>
                  <motion.h6
                    style={{ margin: "5px" }}
                    className="card-subtitle mb-2 text-muted"
                  >
                    Pizza
                  </motion.h6>
                  <motion.p style={{ margin: "5px" }} className="card-text">
                    {items.find((item) => item.id === selectedId).description}
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
                      Buy now
                    </NavLink>
                  </button>
                  <button
                    href="#"
                    style={{ margin: "5px" }}
                    className="btn btn-primary"
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
                    Add car
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
