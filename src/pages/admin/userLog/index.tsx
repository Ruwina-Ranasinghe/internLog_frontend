import UserCard from "../../../components/userCard.tsx";

const UserLog = () => {
    return (
        <div>
            <div className="pb-7 text-2xl font-bold" style={{color: '#1f2937'}}>
                All Users
            </div>
            <UserCard/>
        </div>
    )
}

export default UserLog;