import React, { useState } from "react";
import TaskForm from "./TaskForm";

const TaskManager = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Assignees verisini kontrol edin
  const assignees = [
    {
      id: "1",
      name: "Alice Johnson",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "2",
      name: "Bob Smith",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "3",
      name: "Charlie Brown",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  const handleAddTask = (newTask: any) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-semibold mb-6">Task Manager</h1>
      <button onClick={handleOpenPopup} className="bg-green-500 text-white p-2">
        Create New Task
      </button>

      {isPopupOpen && (
        <TaskForm
          onAddTask={handleAddTask}
          assignees={assignees}
          onClose={handleClosePopup}
        />
      )}

      <div>
        <h2 className="text-xl font-semibold mt-6">Task List</h2>
        <ul>
          {tasks.map((task: any) => (
            <li key={task.id} className="mb-4">
              <div className="text-lg font-medium">{task.title}</div>
              <div className="text-sm text-gray-500">{task.description}</div>
              <div className="text-sm">Assigned to: {task.assignee}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskManager;
