import React from "react"
import Image from "next/image"
import './login.css'

const Login = () => {
    return (
        <main>
            <div className="hello">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Lato&family=Montserrat:wght@700&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
                </style>
                <div id="hello" className="flex flex-row justify-around min-h-screen">
                    {/* <div class="relative h-32 w-32 ...">
          <div class="absolute left-0 top-0 h-16 w-16 ..."></div>
        </div> */}
                    <div className="flex flex-col justify-around items-stretch">
                        <p className="absolute left-[72.99px] top-[59.81px] font-poppins text-white font-bold text-2xl">
                            LOGO
                        </p>
                        {/* <div className="min-h-screen flex justify-center items-center">
            <p className="text-4xl text-center">Your Centered Text</p>
          </div> */}

                        <h1 className="absolute top-80 font-montserrat font-bold text-white self-center text-7xl">
                            Board.
                        </h1>
                        {/*TODO: Update these placeholders with the proper icons*/}
                        <div className="relative top-60 flex flex-row self-center text-white justify-around space-x-10 mt-40 mb-[50px]">
                            <a href="https://github.com/" target="_blank" rel="noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-[30px] w-[30px]"
                                    fill="currentColor"
                                    styles="color: #FFFFFF"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-[30px] w-[30px]"
                                    fill="currentColor"
                                    styles="color: #FFFFFF"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="https://in.linkedin.com/" target="_blank" rel="noreferrer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-[30px] w-[30px]"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                </svg>
                            </a>
                            <a href="https://discord.com/" target="_blank" rel="noreferrer">
                                <svg
                                    class="h-[25px] w-[25px] mt-[5px]" // This sets the width and height consistently with the other icons
                                    fill="currentColor"
                                    viewBox="0 0 24 24" // Correctly set the viewBox attribute
                                    styles="color: #7289da"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd">
                                    <path
                                        d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
                                </svg>
                            </a>

                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-y-3">
                        <h3 className="font-montserrat font-bold self-start text-4xl">
                            Sign In
                        </h3>
                        <p className="font-lato font-normal text-base self-start">Sign into your account</p>
                        <div className="flex flex-row flex-start gap-x-8 my-3">
                            <button className="border rounded-lg border-transparent bg-white p-1">
                                <div className="flex flex-row justify-around items-center gap-x-3">
                                    <style>
                                        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100&family=Montserrat:wght@200&display=swap');
                                    </style>
                                    {/**TODO: Replace these icons with better quality ones*/}
                                    <Image
                                        src="/images/google-icon.png"
                                        width={15}
                                        height={15}
                                    ></Image>
                                    <p className="font-montserrat text-xs font-light text-secondary">
                                        Sign in with Google
                                    </p>
                                </div>
                            </button>
                            <button className="border rounded-lg border-transparent bg-white p-1">
                                <div className="flex flex-row justify-around items-center gap-x-3">
                                    <style>
                                        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100&family=Montserrat:wght@200;300&display=swap');
                                    </style>
                                    <Image
                                        src="/images/apple-icon.png"
                                        width={15}
                                        height={15}
                                    ></Image>
                                    <p className="font-montserrat text-xs font-light text-secondary">
                                        Sign in with Apple
                                    </p>
                                </div>
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <div className="border rounded-2xl border-transparent p-5 bg-white justify-center">
                                <div className="mb-4">
                                    <style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');</style>
                                    <label htmlFor="email" className="font-lato leading-7 text-base text-black mb-2">Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="font-lato text-base caret-[#999999] w-full bg-[#F5F5F5] rounded focus:bg-[#EAEAEA] text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="font-lato leading-7 text-base text-black">Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="font-lato font-base caret-[#999999] w-full bg-[#F5F5F5] rounded focus:bg-[#EAEAEA] text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                                <p className="mb-4 font-lato text-sm text-link">Forgot password?</p>
                                <button className="flex w-full border rounded-lg p-2 justify-center border-transparent bg-button-confirm">
                                    <p className="font-montserrat text-base font-bold text-white">Sign In</p>
                                </button>
                            </div>
                            <div className="flex flex-row gap-x-1 justify-center mt-4">
                                <p className="font-lato text-xs font-base text-secondary">Don't have an account?</p>
                                <p className="font-lato text-xs font-base text-link">Register here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login