import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EditTaskForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { task } = location.state || {};

  // New files user uploads
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'Low',
    dueDate: '',
    attachments: [] as File[],
  });

  // Existing attachments from backend
  const [existingAttachments, setExistingAttachments] = useState<string[]>([]);

  useEffect(() => {
    if (!task) {
      alert("No task data provided!");
      navigate('/view-all-tasks');
      return;
    }

    let formattedDueDate = '';
    if (task.dueDate) {
      const rawDate = typeof task.dueDate === "string" ? task.dueDate : task.dueDate.$date;
      formattedDueDate = new Date(rawDate).toISOString().split("T")[0]; // YYYY-MM-DD
    }

    setFormData({
      title: task.task_name || '',
      description: task.description || '',
      status: task.status || 'pending',
      priority: task.priority || 'Low',
      dueDate: formattedDueDate,
      attachments: [],
    });

    setExistingAttachments(task.attachments || []);
  }, [task, navigate]);

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }));
    }
  };

  const removeNewFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const removeExistingFile = (index: number) => {
    setExistingAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveChanges = async () => {
    if (!task?._id) {
      alert("Task ID missing!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const formPayload = new FormData();

      formPayload.append("task_name", formData.title);
      formPayload.append("description", formData.description);
      formPayload.append("status", formData.status);
      formPayload.append("priority", formData.priority);
      formPayload.append("dueDate", formData.dueDate);

      // Append new files
      formData.attachments.forEach(file => formPayload.append("attachments", file));

      // Append existing attachments as paths so server knows to keep them
      existingAttachments.forEach(path => formPayload.append("existingAttachments", path));

      const res = await fetch(
          `http://localhost:5000/api/tasks/update-task/${task._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
            body: formPayload,
          }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update task");
      } else {
        alert("Task updated successfully!");
        navigate("/view-all-tasks");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating the task.");
    }
  };

  const handleDeleteTask = async () => {
    if (!task?._id) {
      alert("Task ID missing!");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/tasks/delete-task/${task._id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to delete task");
      } else {
        alert("Task deleted successfully!");
        navigate('/view-all-tasks');
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting the task.");
    }
  };

  return (
      <div className="flex items-center justify-center pl-4 pr-4">
        <div className="w-full max-w-md lg:max-w-4xl bg-purple-200 rounded-3xl p-6 shadow-lg border-2 border-purple-300">

          {/* Delete Button */}
          <div className="justify-items-end">
          <button
              onClick={handleDeleteTask}
              className="top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-md"
              aria-label="Delete Task"
              title="Delete Task"
          >
            {/* Trash Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
              />
            </svg>
          </button>
          </div>


          <h1 className="text-2xl font-bold text-gray-800 mb-6 pr-10">Edit Task</h1>

          <div className="space-y-4">
            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
              <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter task description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Priority + Due Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Attachments Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>

              {/* Existing Attachments */}
              {existingAttachments.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {existingAttachments.map((fileUrl, index) => (
                        <a
                            key={index}
                            href={`http://localhost:5000${fileUrl}`} // Serve static files
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
                          {fileUrl.split('/').pop()}
                          {/* Display file name */}
                          <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                removeExistingFile(index);
                              }}
                              className="ml-2 text-red-500 hover:text-red-700"
                          >
                            ✕
                          </button>
                        </a>
                    ))}
                  </div>
              )}


              {/* New Attachments */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                      type="file"
                      multiple
                      onChange={handleFileAdd}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-400 flex items-center">
                    Add any file
                  </div>
                </div>

                <button
                    type="button"
                    onClick={() => {
                      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
                      fileInput?.click();
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
                >
                  Add
                </button>
              </div>


              {formData.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                          <span className="text-sm text-gray-600 truncate">{file.name}</span>
                          <button
                              type="button"
                              onClick={() => removeNewFile(index)}
                              className="text-red-500 hover:text-red-700 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                    ))}
                  </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-3">
              <button
                  onClick={handleSaveChanges}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EditTaskForm;
