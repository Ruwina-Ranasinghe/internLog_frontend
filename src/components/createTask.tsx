import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTaskForm = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        task_name: '',
        description: '',
        status: 'todo', // default status
        priority: 'Low',
        dueDate: '',
        attachments: [] as File[]
    });



    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFormData(prev => ({
                ...prev,
                attachments: [...prev.attachments, ...newFiles]
            }));
        }
    };

    const removeFile = (index: number) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) return alert('Please login first');

        try {
            const formPayload = new FormData();
            formPayload.append('task_name', formData.task_name);
            formPayload.append('description', formData.description);
            formPayload.append('status', formData.status);
            formPayload.append('priority', formData.priority);
            formPayload.append('dueDate', formData.dueDate);

            formData.attachments.forEach(file => {
                formPayload.append('attachments', file);
            });

            const res = await fetch('http://localhost:5000/api/tasks/create-task', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formPayload
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || 'Failed to create task');
            } else {
                alert('Task created successfully!');
                navigate('/user-dashboard');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center pl-4 pr-4 ">
            <div className="w-full max-w-md lg:max-w-4xl bg-purple-200 rounded-3xl p-6 shadow-lg border-2 border-purple-300 ">

                <h1 className="text-2xl font-bold text-gray-800 mb-6 pr-10">Create a Task</h1>

                <div className="space-y-4">
                    {/* Task Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Task Name</label>
                        <input
                            type="text"
                            name="task_name"
                            value={formData.task_name}
                            onChange={handleInputChange}
                            placeholder="Enter task name"
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

                    {/* Status */}
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

                    {/* Priority & Due Date */}
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

                    {/* Attachments */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Add Attachments
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileAdd}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-400 flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                                    </svg>
                                    Add any file
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                                    fileInput?.click();
                                }}
                                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
                            >
                                Add
                            </button>
                        </div>

                        {/* Display files */}
                        {formData.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                                {formData.attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                                        <span className="text-sm text-gray-600 truncate">{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeFile(index)}
                                            className="text-red-500 hover:text-red-700 ml-2"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-purple-600 text-white py-3 px-6 rounded-2xl font-semibold hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                        >
                            Create Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskForm;
