import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllPosts = () => {
    const [loading, setLoading] = useState(false);
    const [blogPosts, setblogPosts] = useState();

    useEffect(() => {
        getAllPosts();
    }, []);

    const getAllPosts = () => {
        setLoading(true);
        axios
            .get("api/getallposts")

            // Handle Success
            .then(function(response) {
                setLoading(false);
                setblogPosts(response?.data?.data);
            })

            // Handle Error
            .catch(function(error) {
                setLoading(false);
                console.log(error);
            })
    };

    return(
        <>
            {loading && (
                <div className="text-2xl font-bold text-center px-56 pt-24">
                    <h1>LOADING.....</h1>
                </div>
            )}

            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {blogPosts?.map((blogPost) => (
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
                                </footer>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AllPosts