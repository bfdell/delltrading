import {NavBar} from "../../shared/NavBar";
import {PropsWithChildren} from "react";
import {useAuth} from "../../core/UseAuth";
import {useNavigate} from "react-router-dom";

export const Profile = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const logoutUser = () => {
        logout().then(() => {
                navigate('/login');
            }
        )
    }
    return (
        <div>
            <NavBar/>
            PROFILE PENDING!!

            <ProfileBox title={"Account Settings"}>
                <div className={"mx-4 flex flex-row justify-between"}>
                    <button onClick={logoutUser} className="btn w-40">Logout</button>
                    <div className={"gap-x-4 flex flex-row justify-start"}>
                        <button className="btn">Reset Portfolio</button>
                        <button className="btn">Delete Account</button>
                    </div>
                </div>
            </ProfileBox>
        </div>
    );
};

//todo: adjust colors and styling
interface ProfileBoxProps extends PropsWithChildren {
    title: string;
}

const ProfileBox = ({children, title}: ProfileBoxProps) => {
    return (
        <div className={"mx-auto w-10/12"}>
            <div className={" text-3xl mb-6"}>
                {title}
            </div>
            {children}
        </div>
    )
}

//PERSONAL INFORMATOIN

//ACCOUNT SETTINGS
//left
//lgout
//all the way on right side...
//delete account
//reset portfolio
