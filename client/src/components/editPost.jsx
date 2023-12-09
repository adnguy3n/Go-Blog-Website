import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import uploadLogo from "./assets/upload-image.svg"
import PropTypes from "prop-types";

const EditPost = ({ logout }) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [imageUpload, setImageUpload] = useState();
    const navigate = useNavigate();
    const { post_id } = useParams();
    const [blogPost, setBlogPost] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
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
        <div>

        </div>
    )
}

EditPost.propTypes = {
    logout: PropTypes.func
}

export default EditPost;