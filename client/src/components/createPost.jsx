import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import uploadLogo from "./assets/upload-image.svg"

const CreatePost = () => {
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState();
    const [imageUpload, setImageUpload] = useState();
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    useEffect(() => {
        const User = localStorage.getItem("user");
        const parseUser = JSON.parse(User);
        setUserData(parseUser);

        if (!User) {
            navigate("/login")
        }
    }, [navigate]);

    const onSubmit = (data) => {
        setLoading(true);

        const body = {
            ...data,
            image: imageData,
            userid: userData.id,
        }

        axios
            .post("api/login", { ...body }, { withCredentials: true, })
            
            // Handle Success
            .then(function () {
                setLoading(false);
                navigate("/");
            })

            // Handle error
            .catch(function (error) {
                setLoading(false);
                console.log(error)
            })
    };

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

    const uploadImage = () => {
        let formData = new FormData();

        // Append the values with key-value pair.
        formData.append("image", imageUpload);
        if (imageUpload) {
            formData.append("name", imageUpload.name);
        }
        
        const config = {
            headers: { "content-type": "multipart/form-data" },
            withCredentials: true,
        }

        axios
            .post("api/login", formData, config)

            // Handle Success
            .then(function (response) {
                setImageData(response?.data?.url)
            })

            // Handle error
            .catch(function (error) {
                console.log(error)
            });
    };
    
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
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-first-name"
                            >
                                Title
                            </label>
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
                                    id="banner"
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
                                                    src={image ? image.image : ""}
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

                        <div className="flex items-center justify-cente px-5">
                            <button
                                className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
                                onClick={uploadImage}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "upload image"}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap w-full -mx-3">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                            >
                                Description
                            </label>
                            <textarea
                                rows="10"
                                name="desc"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                {...register("desc", {
                                    required: true,
                                })}
                            />
                            {errors.desc && errors.desc.type === "required" && (
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

export default CreatePost;