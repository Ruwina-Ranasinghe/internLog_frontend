import UserTasks from "../../../components/adminTaskCard";

const AdminLog = () => {
    return (
                
        <div>
            <div className="pb-7 text-2xl font-bold" style={{color: '#1f2937'}}>
                All Tasks
            </div>
            <UserTasks/>
        </div>
    )
}

export default AdminLog;