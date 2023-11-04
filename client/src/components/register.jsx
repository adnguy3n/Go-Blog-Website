//import { useState } from "react"


const Register = () => {
    return (
        <div className="bg-gradient-to-r min-h-screen lg:min-h-screen  from-cyan-500 to-blue-500">
            <div className="flex justify-center py-10">
                <div className="bg-white w-96 h-auto border border-gray-200 rounded-md">
                    <h1 className="text-center pt-4 text-[#0c2650] text-lg font-bold">
                        Sign up
                    </h1>

                    <div className="pl-8">
                        <div>
                            <div className="text-sm">First Name</div>
                    
                            <div className="relative text-gray-600 focus-within:text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg
                                        fill = "none"
                                        stroke = "currentColor"
                                        strokeLinecap = "round"
                                        strokeLinejoin = "round"
                                        strokeWidth = "2"
                                        viewBox = "0 0 24 24"
                                        className = "w-4 h-4"
                                    >
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </span>
                                <input 
                                    type = "text"
                                    name = "first_name"
                                    className = "py-2 border-b-2 text-sm rounded-md pl-10 focus:outline-none w-10/12 focus:bg-white focus:text-gray-900"
                                    placeholder = "Enter your first name"
                                >
                                </input>
                            </div>

                            <div className="pt-6 text-sm">Last Name:</div>
                            
                            <div className="relative text-gray-600 focus-within:text-gray-400">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg
                                        fill = "none"
                                        stroke = "currentColor"
                                        strokeLinecap = "round"
                                        strokeLinejoin = "round"
                                        strokeWidth = "2"
                                        viewBox = "0 0 24 24"
                                        className = "w-4 h-4"
                                    >
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </span>
                                <input 
                                    type = "text"
                                    name = "last_name"
                                    className = "py-2 border-b-2 text-sm rounded-md pl-10 focus:outline-none w-10/12 focus:bg-white focus:text-gray-900"
                                    placeholder = "Enter your last name"
                                >
                                </input>
                            </div>

                            <div className="pt-6 text-sm">Email:</div>

                            <div className="pt-6 text-sm">Password:</div>

                            <div className="pt-6 text-sm">Phone No:</div>

                            <div className="py-6 px-6">
                                <button
                                    className={
                                        'w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    }
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;