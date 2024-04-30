export const NavBar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className={"flex-1"}>
                <a className="btn mr-5 btn-ghost text-xl">LOGO HERE</a>
                <a className="btn btn-ghost text-xl">Portfolio</a>
                <a className="btn btn-ghost text-xl">Simulations</a>
                <a className="btn btn-ghost text-xl">Compare</a>
            </div>
            <a className="flex-none btn btn-ghost text-xl">PROFILE</a>
        </div>
    );
};