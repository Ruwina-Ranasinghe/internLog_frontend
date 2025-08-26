import SidebarAdmin from "../../../components/sidebarAdmin";
import WebHeader from "../../../components/webHeader";
import UserCard from "../../../components/userCard.tsx";

const UserLog = () => {
    return (

        <div>
            <WebHeader/>
            <div className="flex">
                <SidebarAdmin />
                <div className="flex-1 ml-0 md:ml-64 mt-14 sm:mt-16 md:mt-20 lg:mt-24 p-4 overflow-y-auto">
                    <div className="lg:p-10 lg:pt-50 p-3 pt-10">
                        <div className="pb-7 text-2xl font-bold" style={{color: '#1f2937'}}>
                            All User
                        </div>
                        <UserCard/>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default UserLog;