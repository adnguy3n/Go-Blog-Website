import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const GetPost = () => {
    const [blogPost, setBlogPost] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");

        if (!loggedIn) {
            navigate("/login")
        } else {
            getBlogPost();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getBlogPost = () => {
        axios
            .get()

            .then()

            .catch();
    }

    return (
        <div>
            
        </div>
    )
}

export default GetPost;