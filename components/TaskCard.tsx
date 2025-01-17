import React from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  assignee: string;
  points: number;
  startDate: string;
  endDate: string;
};

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text", task.id);
  };

  return (
    <div
      className="bg-white p-4 rounded shadow cursor-move"
      draggable
      onDragStart={handleDragStart}
    >
      <h3 className="font-bold text-md">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="text-sm text-gray-500 mt-2">
        <p>Assignee: {task.assignee}</p>
        <p>Story Points: {task.points}</p>
        <p>
          Dates: {task.startDate} - {task.endDate}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
