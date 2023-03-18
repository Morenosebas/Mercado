import { useState } from 'react';
import '../styles/socialnet.css'
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"


export const SocialNet = () => {


    return (

        <motion.div drag
            dragConstraints={{
                top: -450,
                left: -1200,
                right: 25,
                bottom: 25,
            }}
            style={{ borderRadius: "15px" }}
            className='container-float '
        >
            <motion.div className="btn-group bg-dark dropstart"
                style={{ borderRadius: "15%" }}

                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],

                }}
                whileHover={{
                    border: '0 solid transparent',
                    borderRadius: ["15%", "15%", "50%", "50%", "15%"],
                }}
            >
                <motion.svg
                    whileHover={{
                        scale: [1, 1.2, 1.2, 1, 1],
                        rotate: [0, 0, 180, 180, 0],
                        border: '0 solid transparent',
                        borderRadius: ["15%", "15%", "50%", "50%", "15%"],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],

                    }}
                    className="btn btn-secondary dropdown-toggle Navig" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "transparent" }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#797979" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </motion.svg>
                {
                    <ul className="dropdown-menu bg-secondary dropgroup" >
                        <li><NavLink className="dropdown-item drop" to="/signin" >Log in</NavLink></li>
                        <li><NavLink className="dropdown-item drop" to="/signup" >Sign up</NavLink></li>
                        <li><NavLink className="dropdown-item drop" to="/profile">Profile</NavLink></li>
                    </ul>
                }
            </motion.div>
        </motion.div>
    )
}



