import { store } from "../../Redux/store.config";
import { initSession, logoutSession } from "../../Redux/slice/user";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export const useInitSession = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const selector = useSelector((state) => state.session.session)
    console.log(selector);
    const dispatch = useDispatch();
    const fetchSession = (TypeRequest, event) => {

        const form = new FormData(event.target)
        console.log(form)
        const data = {
            username: form.get('username'),
            password: form.get('password'),
        }

        fetch(`http://localhost:5000/api/${TypeRequest}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
                // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept" 
                // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            },
            mode: "cors",

            credentials: "include",
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // if (data.success) {
                //     setIsAuthenticated(true);
                // } else {
                //     setIsAuthenticated(false);
                // }
            })
            .catch(err => {
                console.warn(err);
            })
    };

    return [isAuthenticated, fetchSession]
}


