import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const YourBlog = () => {
    const [loading, setLoading] = useState(false)
    const [blogData, setBlogData] = useState();
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const User = localStorage.getItem("users");

        if (!User) {
            navigate("/login")
        }

        getUserPosts();
    }, [navigate]);

    // Gets all of the posts made by the logged in user.
    const getUserPosts = () => {
        setLoading(true);

        axios
            .get(
                "api/userposts",
                {
                    withCredentials: true,
                    headers: {
                        Authorization: "TOKEN",
                    }
                }
            )

            // Handle Success
            .then(function (response) {
                setLoading(false);
                setBlogData(response?.data);
                console.log(response?.data);
            })
            
            // Handle Error
            .catch(function (error) {
                setLoading(false)
                console.log(error?.response?.data?.message)
            });
    };

    const deleteButton = (blogPost) => {
        setDeleteLoading(true);

        axios
            .delete(`api/delete/${blogPost.id}`, {withCredentials: true})

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
            <div className="container my-12 mx-auto px-4 md:px-12">
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

                <div className="flex flex-wrap -mx-1 lg:mx-4">
                    {blogData?.map((blogPost) => (
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={blogPost.id}>
                            <article className="overflow-hidden rounded-lg shadow-lg">
                                <a href={`/`}>
                                    {blogPost?.image ? (
                                        <img
                                            alt="Placeholder"
                                            className="block h-72 w-full"
                                            src={blogPost?.image}
                                        />
                                    ) : (
                                        <div className="block h-72 w-full"/>
                                    )}
                                </a>

                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <a href={`/`}>
                                            {blogPost.title}
                                        </a>
                                    </h1>

                                    <p className="text-grey-darker text-sm">
                                        {new Date(blogPost?.created_at).toLocaleString()}
                                    </p>
                                </header>

                                <footer>

                                </footer>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default YourBlog