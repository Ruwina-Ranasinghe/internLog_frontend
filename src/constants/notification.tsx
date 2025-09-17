import { notifications } from "@mantine/notifications";
import { IconCheck, IconX, IconInfoCircle } from "@tabler/icons-react";

export const notifySuccess = (message: string, title: string = "Success") => {
    notifications.show({
        title,
        message,
        color: "green",
        icon:<IconCheck size={18} />,
        autoClose: 3000,
});
};

export const notifyError = (message: string, title: string = "Error") => {
    notifications.show({
        title,
        message,
        color: "red",
        icon: <IconX size={18} />,
});
};

export const notifyInfo = (message: string, title: string = "Info") => {
    notifications.show({
        title,
        message,
        color: "blue",
        icon: <IconInfoCircle size={18} />,
});
};
