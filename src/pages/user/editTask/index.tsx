import EditTaskForm from "../../../components/editTask";
import SidebarUser from "../../../components/sidebarUser";
import WebHeader from "../../../components/webHeader";

const EditTask = () => {
    return (
                
        <div>
            <WebHeader/>
            <div className="flex">
                <SidebarUser/>
                <main className="flex-1 ml-0 md:ml-64 mt-14 sm:mt-16 md:mt-20 lg:mt-24 p-4 overflow-y-auto">
                    <div className="lg:pt-1 p-1 pt-8">
                        <div>
                            <EditTaskForm />
                        </div>
                    </div>
                    
                </main>
            </div>

        </div>
        
    )
}

export default EditTask;