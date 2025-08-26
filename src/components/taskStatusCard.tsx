interface TaskStatusCardsProps {
  completed: number;
  inProgress: number;
  todo: number;
}

const TaskStatusCards: React.FC<TaskStatusCardsProps> = ({
  completed,
  inProgress,
  todo,
}) => {
  const tasks = [
    { label: 'Completed Tasks', count: completed, color: '#22C55E', bgColor: '#DCFCE7' }, // green
    { label: 'In Progress Tasks', count: inProgress, color: '#EF4444', bgColor: '#FEE2E2' }, // red
    { label: 'To do Tasks', count: todo, color: '#A855F7', bgColor: '#F3E8FF' }, // purple
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg border w-full"
    style={{ border: "1px solid #830999" }}>
      <div className="flex flex-wrap justify-between gap-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex-1 min-w-[150px] p-4 rounded-lg flex flex-col items-center text-center"
            style={{ backgroundColor: task.bgColor }}
          >
            <div className="flex items-center mb-2">
              <div
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: task.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {task.label}
              </span>
            </div>
            <div
              className="text-3xl font-bold"
              style={{ color: task.color }}
            >
              {task.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusCards;
