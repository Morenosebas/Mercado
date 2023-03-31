import { store } from "../../Redux/store.config";
import { initSession } from "../../Redux/slice/user";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";


export const useInitSession = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const selector = useSelector((state) => state.session)
    const dispatch = useDispatch();
    const fetchSession = async (TypeRequest, event) => {
        const form = new FormData(event.target)
        const data = {
            username: form.get('username'),
            password: form.get('password'),
        }

        fetch(`http://localhost:5000/api/${TypeRequest}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: "cors",

            credentials: "include",
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if (data.isAuthenticated) {
                    const username = data.requestUser.username;
                    const createdDt = data.requestUser.createdAt;
                    const updatedDt = data.requestUser.updatedAt;
                    const id = data.requestUser._id;
                    console.log(data)
                    setIsAuthenticated(true);
                    dispatch(initSession({ username, createdDt, updatedDt, id: id, storeS: data.requestUser.store }))
                    setError(false)
                }
                return "Hola"
            })
            .catch(err => {
                setError({ err })
            })
    };

    return [isAuthenticated, fetchSession, error]
}


