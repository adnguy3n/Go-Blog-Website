import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState();
    const [imageUpload, setImageUpload] = useState();
    const [userData, setUserData] = useState();
    const [loadingData, setLoadingData] = useState(false);
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
        formData.append("name", imageUpload.name);
        
        const config = {
            headers: { "content-type": "multipart/form-data" },
            withCredentials: true,
        }

        axios
            .post("api/login", formData, config)

            // Handle Success
            .then(function (response) {
                setLoadingData(false);
                setImageData(response?.data?.url)
            })

            // Handle error
            .catch(function (error) {
                setLoadingData(false);
                console.log(error)
            });
    };
    
    return (
        <>
            <div className="max-w-screen-md mx-auto p-5">
                <div className="text-center mb-16">
                    <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
                        Create your Blog
                    </p>

                    <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                        Express your <span className="text-indigo-600">Feelings</span>
                    </h3>
                </div>
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

                
            </form>
        </>
    );
};

export default CreatePost;