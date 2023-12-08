import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");
        setLoginStatus(loggedIn);
    }, [loginStatus]);

    const logOut = () => {
        axios
            .post("api/logout")

            // Handle Success
            .then(function() {
                setLoading(false);
                localStorage.removeItem("loggedIn");
                navigate("/login");
            })

            // Handle Error
            .catch(function (error) {
                setLoading(false);
                console.log(error)
            });
    };

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <svg
                    className="fill-current h-8 w-8 mr-2"
                    width="54"
                    height="54"
                    viewBox="0 0 54 54"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
                    <path d="M0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                </svg>
                <span className="font-semibold text-xl tracking-tight">
                    Golang Blog
                </span>
            </div>

            <label
                className="block lg:hidden cursor-pointer items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                htmlFor="menu-toggle"
            >
                <svg
                    className="fill-current h-3 w-3"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title>
                        Menu
                    </title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </label>
            <input className="hidden" type="checkbox" id="menu-toggle" />

        </nav>
    );
};

export default Navbar