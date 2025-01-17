import React from "react";
import TaskCard from "./TaskCard";

type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  points: number;
  startDate: string;
  endDate: string;
};

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  onDropTask: (taskId: string, targetColumn: string) => void;
};

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks,
  onDropTask,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData("text");
    onDropTask(taskId, title.toLowerCase().replace(" ", ""));
  };

  return (
    <div
      className="bg-gray-100 p-4 rounded shadow w-80"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={(e) => e.dataTransfer.setData("text", task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
