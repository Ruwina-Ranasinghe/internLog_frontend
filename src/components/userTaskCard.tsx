import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  task_name: string;
  description: string;
  status: "todo" | "in-progress" | "completed";
  attachments?: string[];
}

const TaskCard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login first");

      try {
        const res = await fetch("http://localhost:5000/api/tasks/get-tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          alert(data.message || "Failed to fetch tasks");
        } else {
          setTasks(data);
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong while fetching tasks.");
      }
    };

    fetchTasks();
  }, []);

  // Separate useEffect for navigation
  // useEffect(() => {
  //   if (selectedTaskId) {
  //     navigate(`/edit-task/${selectedTaskId}`);
  //   }
  // }, [selectedTaskId, navigate]);

  const handleNavigateToEdit = (task: Task) => {
    navigate(`/edit-task/${task._id}`, { state: { task } });
  };


  const getStatusClass = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-yellow-500 text-white";
      case "in-progress":
        return "bg-red-600 text-white";
      case "completed":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

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
                              href={`http://localhost:5000${file}`} // backend must serve static files
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
              {task.status === "in-progress"
                  ? "In Progress"
                  : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>

                <button
                    onClick={() => handleNavigateToEdit(task)}
                    className="p-2 border rounded hover:bg-gray-100 transition-colors"
                    title="Edit Task"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-800"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                        fillRule="evenodd"
                        d="M2 16a1 1 0 011-1h3.586l7.707-7.707a1 1 0 010 1.414L6.414 16H3a1 1 0 01-1-1z"
                        clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
        ))}
      </div>
  );
};

export default TaskCard;
