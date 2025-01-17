import React, { useState } from "react";

type TaskFormProps = {
  onAddTask: (task: any) => void;
  assignees: { id: string; name: string; avatarUrl: string }[] | undefined;
  onClose: () => void; // Close method for popup
};

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  assignees,
  onClose,
}) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskTitle || !taskDescription || !selectedAssignee) {
      alert("Please fill all fields.");
      return;
    }

    const newTask = {
      id: Math.random().toString(),
      title: taskTitle,
      description: taskDescription,
      assignee: selectedAssignee,
    };

    onAddTask(newTask);
    onClose(); // Close the popup after submission
    setTaskTitle("");
    setTaskDescription("");
    setSelectedAssignee("");
  };

  if (!assignees || assignees.length === 0) {
    return <div>No assignees available</div>;
  }

  return (
    <div className="popup-form">
      <div className="popup-content">
        <h3>Create New Task</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full p-2 border border-gray-300"
          />
          <textarea
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="w-full p-2 border border-gray-300"
          />
          <div>
            <label>Assignee</label>
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full p-2 border border-gray-300"
            >
              <option value="">Select Assignee</option>
              {assignees.map((assignee) => (
                <option key={assignee.id} value={assignee.id}>
                  {assignee.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2">
            Add Task
          </button>
        </form>
        <button
          onClick={onClose}
          className="w-full bg-red-500 text-white p-2 mt-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
