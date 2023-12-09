import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uploadLogo from "./assets/upload-image.svg"
import PropTypes from "prop-types";

const CreatePost = ({ logout }) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState();
    const [imageUpload, setImageUpload] = useState();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    useEffect(() => {
        const loggedIn = localStorage.getItem("loggedIn");

        if (!loggedIn) {
            navigate("/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Called when the Create Post button is pressed.
    const onSubmit = (data) => {
        setLoading(true);
        if (imageUpload) {
            uploadImage(data);
        } else {
            createBlogPost(data);
        }
    };

    // Handles image preview after selection.
    const handleImage = (e) => {
        setImageUpload(e.target.files[0]);

        const reader = new FileReader();
        reader.onloadend = function() {
            setImage({ [e.target.name]: reader.result });
        };

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            e.target.value = null;
        }
    };

    // Upload Image to Server.
    const uploadImage = (data) => {
        let formData = new FormData();
        let imageData = "";

        // Append the values with key-value pair.
        formData.append("image", imageUpload);
        if (imageUpload) {
            formData.append("name", imageUpload.name);

            const config = {
                headers: { "content-type": "multipart/form-data" },
                withCredentials: true,
            }

            axios
            .post("api/upload", formData, config)

            // Handle Success
            .then(function (response) {
                imageData = response?.data?.url;
                createBlogPost(data, imageData);
            })

            // Handle error
            .catch(function (error) {
                console.log(error);
                navigate("/login");
                logout();
            })
        }
    };

    // Create Blog Post
    const createBlogPost = (data, imageData) => {
        const body = {
            ...data,
            image: imageData,
        }

        axios
            .post("api/post", { ...body }, { withCredentials: true, })
            
            // Handle Success
            .then(function () {
                setLoading(false);
                navigate("/yourblog");
            })

            // Handle error
            .catch(function (error) {
                setLoading(false);
                console.log(error);
                navigate("/login");
                logout();
            })
    }
    
    return (
            <div className="max-w-screen-md mx-auto p-5">
                <div className="text-center mb-16">
                    <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                        Create your Blog
                    </p>

                    <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                        Express your <span className="text-indigo-600">Feelings</span>
                    </h3>
                </div>

                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-full px-3 mb-6 md:mb-0">
                            <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Title
                            </div>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name"
                                type="text"
                                placeholder="title"
                                name="title"
                                autoComplete="off"
                                {...register("title", {
                                required: true,
                                })}
                            />
                            {errors.title && errors.title.type === "required" && (
                                <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 items-center lg:items-start mb-6">
                        <div className="w-full px-3">
                            <label title="click to select a picture">
                                <input
                                    accept="image/*"
                                    className="hidden"
                                    type="file"
                                    name="image"
                                    onChange={handleImage}
                                    visibility="hidden"
                                />
                                <div className="flex flex-col">
                                    <div className="pb-2">Upload Image</div>

                                    {image ? (
                                        <div className="pt-4">
                                            <div>
                                                <img
                                                    className="-object-contain -mt-8 p-5 w-1/2"
                                                    src={image.image}
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="pb-5">
                                            <img
                                                src={uploadLogo}
                                                style={{ background: "#EFEFEF" }}
                                                className="h-full w-48"
                                            />
                                        </div>
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-wrap w-full -mx-3">
                        <div className="w-full px-3">
                            <div
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                Description
                            </div>
                            <textarea
                                rows="10"
                                name="description"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                {...register("description", {
                                    required: true,
                                })}
                            />
                            {errors.description && errors.description.type === "required" && (
                                <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p>
                            )}
                        </div>

                        <div className="flex justify-between w-full px-3">
                            <button
                                className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Create Post"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
    );
};

CreatePost.propTypes = {
    logout: PropTypes.func
}

export default CreatePost;