import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const GetPost = ({ logout }) => {
    const [blogPost, setBlogPost] = useState();
    const { post_id } = useParams();
    const navigate = useNavigate();

    // Gets the blog post if the user is logged in.
    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");

        if (!loggedIn) {
            navigate("/login")
        } else {
            getBlogPost();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Get a specific blog post.
    const getBlogPost = () => {
        axios
            .get(`api/getpost/${post_id}`, {withCredentials: true,})

            // Handle Success
            .then(function(response) {
                setBlogPost(response?.data?.data);
            })

            // Handle Error
            .catch(function (error) {
                console.log(error);
                navigate("/login");
                logout();
            });
    }

    return (
        <div className="relative">
            <div className="max-w-3xl mb-10 rounded overflow-hidden flex flex-col mx-auto text-center">
                <div className="max-w-3xl mx-auto text-xl sm:text-4xl font-semibold inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2">
                    <p>{blogPost?.title}</p>
                </div>

                <img className="w-full h-96 my-4" src={blogPost?.image} />
            </div>
        </div>
    )
}

GetPost.propTypes = {
    logout: PropTypes.func
}

export default GetPost;