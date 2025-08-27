import { Outlet } from "react-router-dom";
import WebHeader from "../components/webHeader.tsx";
import UserSidebar from "../components/sidebarUser.tsx";

const UserLayout = () => {
    return (
        <div>
            <WebHeader/>
            <div className="flex">
                <UserSidebar />
                <div className="flex-1 ml-0 md:ml-64 mt-14 sm:mt-16 md:mt-20 lg:mt-24 p-4 overflow-y-auto">
                    <div className="lg:p-10 lg:pt-50 p-3 pt-10">
                        <Outlet/>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default UserLayout;
