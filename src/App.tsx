import {MantineProvider} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {Notifications} from "@mantine/notifications";

const App = () => {

    return (
        <MantineProvider
            theme={{
                primaryColor: "custom", // any name you want
                colors: {
                    custom: [
                        "#B453F5", // shade 0
                        "#B453F5", // shade 1
                        "#B453F5", // shade 2
                        "#B453F5", // shade 3
                        "#B453F5", // shade 4
                        "#B453F5", // shade 5
                        "#B453F5", // shade 6
                        "#B453F5", // shade 7
                        "#B453F5", // shade 8
                        "#B453F5", // shade 9
                    ],
                },
                primaryShade: 2,
            }}
        >
            <Notifications position="top-right"/>
            <div className="min-h-screen bg-gray-50">
                <Outlet />
            </div>
        </MantineProvider>
    );
};

export default App;




