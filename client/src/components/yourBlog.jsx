import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const YourBlog = ({ logout }) => {
    const [loading, setLoading] = useState(false)
    const [blogData, setBlogData] = useState();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    // Get all of the user's blog posts if they are logged in.
    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");

        if (!loggedIn) {
            navigate("/login")
        } else {
            getUserPosts();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Gets all of the posts made by the logged in user.
    const getUserPosts = () => {
        setLoading(true);

        axios
            .get("api/userposts", { withCredentials: true, })

            // Handle Success
            .then(function (response) {
                setLoading(false);
                setBlogData(response?.data);
            })
            
            // Handle Error
            .catch(function (error) {
                setLoading(false);
                console.log(error?.response?.data?.message);
                navigate("/login");
                logout();
            });
    };

    const deleteButton = (blogPost) => {
        setDeleteLoading(true);

        axios
            .delete(`api/delete/${blogPost.post_id}`, {withCredentials: true})

            .then(function (response) {
                setDeleteLoading(false);
                getUserPosts();
                console.log(response?.data);
            })

            .catch(function(error) {
                setDeleteLoading(false);
                console.log(error?.response?.data?.message)
            });
    };

    return (
        <>
            {!loading && blogData?.length <= 0 && (
                    <div className="text-2xl font-bold text-center flex justify-center items-center pl-16 pt-24">
                        <h1>You do not have post yet. Kindly create a post </h1>
                    </div>
                )}

            {loading && (
                <div className="text-2xl font-bold text-center px-56 pt-24">
                    <h1>LOADING.....</h1>
                </div>
            )}

            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:mx-4">
                    {blogData?.map((blogPost) => (
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={blogPost.post_id}>
                            <article className="overflow-hidden rounded-lg shadow-lg">
                                <Link to={`/getPost/${blogPost.post_id}`}>
                                    {blogPost?.image ? (
                                        <center>
                                            <img
                                                alt="Placeholder"
                                                className="block h-72 w-100%"
                                                src={blogPost?.image}
                                            />
                                        </center>
                                    ) : (
                                        <div className="block h-72 w-full"/>
                                    )}
                                </Link>
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <Link to={`/getPost/${blogPost.post_id}`}>
                                            {blogPost.title}
                                        </Link>
                                    </h1>

                                    <p className="text-grey-darker text-sm">
                                        {new Date(blogPost?.created_at).toLocaleString()}
                                    </p>
                                </header>

                                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                    <p className="ml-2 text-sm">
                                        {blogPost?.user?.first_name} {blogPost?.user?.last_name}
                                    </p>

                                    <right>
                                        <button
                                            onClick={() => deleteButton(blogPost)}
                                            disabled={loading}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
                                        >
                                            {deleteLoading ? "Loading" : "Delete"}
                                        </button>

                                        <Link to={`/edit/${blogPost.post_id}`}>
                                            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                                Edit
                                            </button>
                                        </Link>
                                    </right>
                                </footer>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

YourBlog.propTypes = {
    logout: PropTypes.func
}

export default YourBlog