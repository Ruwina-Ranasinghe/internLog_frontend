import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../interceptors/axiosInterceptor.ts";

interface Task {
  _id: string;
  task_name: string;
  description: string;
  status: "To do" | "In Progress" | "Completed";
  attachments?: string[];
}

const UserTasks: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
//*****Very Wrong*****
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "to do":
      case "todo":
        return "bg-yellow-500 text-white";
      case "in progress":
      case "in-progress":
        return "bg-red-600 text-white";
      case "completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/user/${id}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-6">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="text-center text-gray-500 mt-6">This user currently has no tasks.</p>;
  }

  return (
      <div className="space-y-4">
        {tasks.length === 0 && <div>No tasks found.</div>}

        {tasks.map((task) => (
            <div
                key={task._id}
                className="bg-white p-4 rounded-xl border border-purple-300 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-lg">{task.task_name}</h2>
                <p className="text-gray-600 text-sm mt-1">{task.description}</p>

                {task.attachments && task.attachments.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {task.attachments.map((file, index) => (
                          <a
                              key={index}
                              href={`http://localhost:5000${file}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 transition-colors font-medium shadow-sm"
                          >
                            {/* Download icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-4-4m4 4l4-4M12 4v8"
                              />
                            </svg>
                            Attachment {index + 1}
                          </a>
                      ))}
                    </div>
                )}
              </div>

              <div className="flex items-center gap-2">
            <span
                className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusClass(
                    task.status
                )}`}
            >
              {task.status === "In Progress"
                  ? "In Progress"
                  : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
              </div>
            </div>
        ))}
      </div>
  );
};
export default UserTasks;
