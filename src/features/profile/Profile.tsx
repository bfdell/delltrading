import {NavBar} from "../../shared/NavBar";
import {PropsWithChildren, useRef} from "react";
import {useAuth} from "../../core/UseAuth";
import {useNavigate} from "react-router-dom";
import {useUserData} from "../../core/UseUserData";

export const Profile = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();
    const {userData} = useUserData();

    const logoutUser = () => {
        logout()
    }

    const deleteUser = () => {
        console.log("Deleting account");
    }

    const resetPortfolio = () => {
        console.log("Resetting portfolio");
        // After portfolio reset, navigate back to home page with your portfolio
    }

    return (
        <div>
            <NavBar/>
            <div className={"container mx-auto w-10/12"}>
                <div className={"text-5xl font-bold mb-4"}>
                    {userData!.firstName} {userData!.lastName}
                </div>

                <div className="flex gap-2 text-black">


                    {/*<div className="stat py-10 basis-1/5 bg-gray-100 rounded-xl text-black">*/}
                    {/*    <div className="stat-figure">*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                    {/*             className="inline-block w-8 h-8 stroke-current">*/}
                    {/*            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
                    {/*                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>*/}
                    {/*        </svg>*/}
                    {/*    </div>*/}
                    {/*    <div className="stat-title text-gray-600 ">Profile Resets</div>*/}
                    {/*    <div className="stat-value">1</div>*/}
                    {/*    /!*<div className="stat-desc">Jan 1st - Feb 1st</div>*!/*/}
                    {/*</div>*/}

                    {/*<div className="stat bg-gray-100">*/}
                    {/*    <div className="stat-figure text-secondary">*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                    {/*             className="inline-block w-8 h-8 stroke-current">*/}
                    {/*            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
                    {/*                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>*/}
                    {/*        </svg>*/}
                    {/*    </div>*/}
                    {/*    <div className="stat-title">New Users</div>*/}
                    {/*    <div className="stat-value">4,200</div>*/}
                    {/*    <div className="stat-desc">↗︎ 400 (22%)</div>*/}
                    {/*</div>*/}

                    {/*<div className="stat bg-gray-100">*/}
                    {/*    <div className="stat-figure text-secondary">*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"*/}
                    {/*             className="inline-block w-8 h-8 stroke-current">*/}
                    {/*            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
                    {/*                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>*/}
                    {/*        </svg>*/}
                    {/*    </div>*/}
                    {/*    <div className="stat-title">New Registers</div>*/}
                    {/*    <div className="stat-value">1,200</div>*/}
                    {/*    <div className="stat-desc">↘︎ 90 (14%)</div>*/}
                    {/*</div>*/}

                </div>

                <ProfileBox title={"Account Settings"}>
                    <div className={"mx-4 flex flex-row justify-between"}>
                        <button onClick={logoutUser} className="btn w-40">Logout</button>
                        <div className={"gap-x-4 flex flex-row justify-start"}>
                            <SecurityButtonModal title={"Reset Portfolio"} handleFunction={resetPortfolio}>
                                <p className="">This will delete your entire stock portfolio, trade history, and reset
                                    your portfolio value back to $100,000 in cash.</p>
                            </SecurityButtonModal>

                            <SecurityButtonModal title={"Delete Account"} handleFunction={deleteUser}>
                                <p>Are you sure you want to delete your account?</p>
                            </SecurityButtonModal>
                        </div>
                    </div>
                </ProfileBox>
            </div>
        </div>
    );
};

interface ProfileBoxProps extends PropsWithChildren {
    title: string;
}

const ProfileBox = ({
                        children, title
                    }: ProfileBoxProps) => {
    return (
        <div className={"mx-auto"}>
            <div className={" text-3xl mb-6"}>
                {title}
            </div>
            {children}
        </div>
    )
}

const ProfileStatCard = ({children, title}: ProfileBoxProps) => {
    return (
        <></>
    );
}

interface ModalBoxProps extends ProfileBoxProps {
    handleFunction: Function
}

const SecurityButtonModal = ({children, title, handleFunction}: ModalBoxProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const closeModal = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    return (
        <div>
            <button className="btn" onClick={openModal}>{title}</button>
            <dialog ref={dialogRef} id={title} className="modal">
                <div className="modal-box flex flex-col">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-warning text-lg mb-3">Warning!</h3>
                    {children}
                    <p> This process is <span className={"font-bold"}> irreversible</span>.</p>
                    <button onClick={(e) => {
                        handleFunction()
                    }} className="ml-auto mt-8 btn btn-outline btn-error">{title}</button>
                </div>
                <form method="dialog" className={"modal-backdrop"} onClick={closeModal}>
                </form>
            </dialog>
        </div>
    );
}

//PERSONAL INFORMATOIN

//ACCOUNT SETTINGS
//left
//lgout
//all the way on right side...
//delete account
//reset portfolio
