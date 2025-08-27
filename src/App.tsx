import {MantineProvider} from "@mantine/core";
import {Outlet} from "react-router-dom";

const App = () => {

    return (
        <MantineProvider>
            <div className="min-h-screen bg-gray-50">
                <Outlet />
            </div>
        </MantineProvider>
    );
};

export default App;




