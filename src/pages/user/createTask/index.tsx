import CreateTaskForm from "../../../components/createTask";
import SidebarUser from "../../../components/sidebarUser";
import WebHeader from "../../../components/webHeader";

const CreateTask = () => {
    return (
                
        <div>
            <WebHeader/>
            <div className="flex">
                <SidebarUser/>
                <div className="flex-1 ml-0 md:ml-64 mt-14 sm:mt-16 md:mt-20 lg:mt-24 p-4 overflow-y-auto">
                    <div className="lg:pt-1 p-1 pt-8">
                        <div>
                            <CreateTaskForm />
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
        
    )
}

export default CreateTask;