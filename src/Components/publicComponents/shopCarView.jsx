import { useDispatch } from "react-redux";
import { store } from "../../Redux/store.config";
import { addCart as deleteCartReducer } from '../../Redux/slice/user'
export const ShopCarView = function ({ products, onMouseLeave }) {
  const dispatch = useDispatch();

  const deleteCart = function () {
    dispatch(deleteCartReducer({ cart: [] }));
    sessionStorage.removeItem("cart");
  }
  const deleteProduct = function (id) {
    const newCart = products.filter((item) => item._id !== id);
    dispatch(deleteCartReducer({ cart: newCart }));
    sessionStorage.setItem("cart", JSON.stringify(newCart));
  }
  const lessProduct = function (id) {
    const equalProductIndex = products.findIndex((item) => item._id === id);
    const equalProduct = products[equalProductIndex];
    const updatedProduct = { ...equalProduct, quantity: equalProduct.quantity - 1 };
    const newCart = [...products];
    newCart[equalProductIndex] = updatedProduct;
    if (updatedProduct.quantity === 0) {
      deleteProduct(id);
    } else {
      dispatch(deleteCartReducer({ cart: newCart }));
      sessionStorage.setItem("cart", JSON.stringify(newCart));
    }
  }
  return (
    <div
      onMouseLeave={onMouseLeave}
      className=" position-absolute bg-dark text-light "
      style={{
        width: "400px",
        maxHeight: "500px",
        overflowX: "hidden",
        top: "50px",
        right: "0px",
        zIndex: "1000",
        borderRadius: "10px",
        border: "1px solid black",
        padding: "10px",
      }}
    >
      <h5>Carrito de compras</h5>
      <div
        style={{
          maxHeight: "400px",
          overflowY: "scroll",
          overflowX: "hidden",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid black",
          backgroundColor: "white",
          marginBottom: "10px",
          fontSize: "10px",
        }}
      >
        <div className="row">
          <div className="col-12">
            <table className="table" style={{ tableLayout: "fixed", maxWidth: "400px" }}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product._id} className="text-center">
                      <td className="fw-bolder">{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>${product.price}</td>
                      <td>${product.price * product.quantity}</td>
                      <td className="d-flex " style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <td onClick={() => deleteProduct(product._id)} className="btn btn-danger text-dark">x</td>
                        <td onClick={() => lessProduct(product._id)} className="btn btn-warning text-dark">-</td>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button className="btn btn-dark" onClick={deleteCart} style={{ fontSize: "10px" }}>Limpiar carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
};
