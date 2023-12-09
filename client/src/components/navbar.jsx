import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ loginStatus, checkLogin}) => {
    const logOut = () => {
        axios
            .get("api/logout", { withCredentials: true })

            // Handle Success
            .then(function() {
                checkLogin();
            })

            // Handle Error
            .catch(function (error) {
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

            <div className="block w-full flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <Link
                        to="/"
                        className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                    >
                        Home
                    </Link>

                    <Link
                        to="/createpost"
                        className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                    >
                        Create Post
                    </Link>

                    <Link
                        to="/yourblog"
                        className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                    >
                        Your Blog
                    </Link>

                    {loginStatus ? (
                        <button
                            className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                            onClick={logOut}
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                            >
                                login
                            </Link>
                            
                            <Link
                                to="/register"
                                className="block mt-4 text-base lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                            >
                                register
                            </Link>
                        </>
                    )}
                </div>

            </div>

        </nav>
    );
};

Navbar.propTypes = {
    loginStatus: PropTypes.bool,
    checkLogin: PropTypes.func
};

export default Navbar