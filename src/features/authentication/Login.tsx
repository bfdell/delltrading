export const Login = () => {

    return (
        <div className="h-screen gap-0 flex">
            <div className={"w-2/5 h-max border-solid border-2"}>
                LOGO HERE
            </div>
            <div className={"w-3/5 h-max justify-center flex flex-col border-solid border-2"}>
                <h1 className={"text-5xl mb-16 mx-auto inset-0"}>BDell Trading</h1>
                <label className="mx-auto form-control w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Email</span>
                    </div>
                    <input type="text" placeholder="email" className="input input-bordered w-full max-w-md"/>
                </label>
                <label className="mx-auto my-4 form-control w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="password" placeholder="password" className="input input-bordered w-full max-w-md"/>
                    <div className="label my-.5">
                        <span
                            className="flex flex-row content-center items-center label-text-alt"><span
                            className={"mx-2"}>Remember me:</span> <input
                            type="checkbox"
                            className="checkbox"/></span>
                        <span className="label-text-alt">Forgot password?</span>
                    </div>
                </label>
                <button className="mx-auto w-full max-w-md btn">Sign in</button>

                <div className="mx-auto my-9 w-full max-w-md divider">or</div>

                {/*TODO: change to google Green*/}
                {/*TODO: create assets folder and put everything in there*/}
                <button className="mx-auto bg-white w-full max-w-md btn text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                         className="h-6 w-6" fill="none" viewBox="0 0 31.8 31.8">
                        <defs>
                            <path id="A"
                                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                        </defs>
                        <clipPath id="B">
                            <use xlinkHref="#A"/>
                        </clipPath>
                        <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
                            <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05"/>
                            <path d="M0 11l17 13 7-6.1L48 14V0H0z" clipPath="url(#B)" fill="#ea4335"/>
                            <path d="M0 37l30-23 7.9 1L48 0v48H0z" clipPath="url(#B)" fill="#34a853"/>
                            <path d="M48 48L17 24l-4-3 35-10z" clipPath="url(#B)" fill="#4285f4"/>
                        </g>
                    </svg>
                    Sign in with Google
                </button>
                {/*todo: change a tag*/}
                <div className="mx-auto text-xs mt-7">Don't have an account? <a href="http://localhost"
                                                                                className="text-blue-500 hover:text-blue-700">Create
                    an Account</a></div>
            </div>
        </div>
    );
};

// const LoginTitle = () => {
//     return (
//         <></>
//     );
// };
