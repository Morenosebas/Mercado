import { store } from "../../Redux/store.config";
import { initSession } from "../../Redux/slice/user";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export const useGetShopsData = () => {
  //Revisar ruta si es correcta
  //las inicializaciones deben ser remplazadas por una cache
  const [shops, setShops] = useState(null);
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const data = await fetch("http://localhost:5000/api/shops");
    const response = await data.json();
    if (!response.error) {
      setShops(response);
    } else {
      setShops(null);
    }
    const data2 = await fetch("http://localhost:5000/api/products");
    const response2 = await data2.json();
    if (!response2.error) {
      setProducts(response2.products);
    } else {
      setProducts(null);
    }
  };
  return [shops, products, fetchProducts];
};

export const useInitSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const selector = useSelector((state) => state.session);
  const dispatch = useDispatch();

  const fetchSession = async (TypeRequest, event) => {
    const form = new FormData(event.target);
    const data = {
      username: form.get("username"),
      password: form.get("password"),
    };
    try {
      const response = await fetch(`http://localhost:5000/api/${TypeRequest}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (responseData.isAuthenticated) {
        const { username, requestUser } = responseData;
        const { createdAt, updatedAt, _id, store } = requestUser;
        setIsAuthenticated(true);
        dispatch(
          initSession({
            username: username,
            createdDt: createdAt,
            updatedDt: updatedAt,
            id: _id,
            storeS: store,
          })
        );
        setError(null);
      } else {
        setError(responseData.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return [isAuthenticated, fetchSession, error, setError];
};
