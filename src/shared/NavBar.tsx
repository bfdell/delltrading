import {useNavigate} from "react-router-dom";
import {PropsWithChildren} from "react";
import {UserIcon} from "@heroicons/react/24/solid";
import {useCurrentUser, useUserData} from "../core/useCurrentUser";

//todo: ADD DIFFERNT BACKGROUND COLOR TO SHOW ACTIVE TAB...
export const NavBar = () => {
    const {userData} = useUserData();

    return (
        <div className="navbar bg-base-100 flex justify-between space-x-14">
            <div>
                <NavBarLink pathName={'/'} isLogo> BDELL TRADING</NavBarLink>
                {/*<NavBarLink pathName={'/simulations'}> Simulations</NavBarLink>*/}
                {/*<NavBarLink pathName={'/compare'}> Compare</NavBarLink>*/}
            </div>
            <NavBarLink pathName={'/profile'}>
                <div className={"flex flex-row items-center"}>
                    <UserIcon className={"mr-2 size-9"}/>
                    {/*//todo: put skeleton while loading on a refersh*/}
                    <span>{`${userData!.firstName} ${userData!.lastName}`}</span>
                </div>
            </NavBarLink>
        </div>
    );
};

interface NavBarLinkProps extends PropsWithChildren {
    pathName: string;
    isLogo?: boolean;
}

export const NavBarLink = ({
                               children, pathName, isLogo = false
                           }: NavBarLinkProps) => {
    const navigate = useNavigate();
    const extraStyles = isLogo ? 'mr-5' : '';
    return <span onClick={() => {
        navigate(pathName);
    }} className={`${extraStyles} btn btn-ghost text-xl`}>{children}</span>;
}