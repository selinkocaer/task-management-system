import React, { useState } from "react";
import AvatarList from "../components/AvatarList";
import TaskColumn from "../components/TaskColumn";

const dummyUsers = [
  { id: "1", name: "Selin", avatarUrl: "/avatars/selin.jpg" },
  { id: "2", name: "Yoda", avatarUrl: "/avatars/yoda.jpg" },
  { id: "3", name: "Ayla", avatarUrl: "/avatars/ayla.jpg" },
];

const dummyTasks = {
  open: [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      assignee: "Yoda",
      points: 3,
      startDate: "2025-01-01",
      endDate: "2025-01-05",
    },
  ],
  inProgress: [],
  inReview: [],
  done: [],
};

const HomePage = () => {
  const [tasks, setTasks] = useState(dummyTasks);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [taskPoints, setTaskPoints] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDropTask = (taskId: string, targetColumn: string) => {
    const sourceColumn = Object.keys(tasks).find((column) =>
      tasks[column as keyof typeof tasks].some((task) => task.id === taskId),
    );

    if (!sourceColumn) return;

    const taskToMove = tasks[sourceColumn as keyof typeof tasks].find(
      (task) => task.id === taskId,
    )!;

    setTasks((prev) => ({
      ...prev,
      [sourceColumn]: prev[sourceColumn as keyof typeof tasks].filter(
        (task) => task.id !== taskId,
      ),
      [targetColumn]: [...prev[targetColumn as keyof typeof tasks], taskToMove],
    }));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !taskTitle ||
      !taskDescription ||
      !selectedAssignee ||
      taskPoints <= 0 ||
      !startDate ||
      !endDate
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      description: taskDescription,
      assignee: selectedAssignee,
      points: taskPoints,
      startDate: startDate,
      endDate: endDate,
    };

    setTasks((prev) => ({
      ...prev,
      open: [...prev.open, newTask],
    }));

    setTaskTitle("");
    setTaskDescription("");
    setSelectedAssignee(null);
    setTaskPoints(0);
    setStartDate("");
    setEndDate("");
    setIsPopupOpen(false);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 shadow-lg">
          Task Management
        </h1>
      </div>

      <AvatarList users={dummyUsers} />
      <div className="mt-4">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create New Task
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <TaskColumn
          title="Open"
          tasks={tasks.open}
          onDropTask={(taskId) => handleDropTask(taskId, "open")}
        />
        <TaskColumn
          title="In Progress"
          tasks={tasks.inProgress}
          onDropTask={(taskId) => handleDropTask(taskId, "inProgress")}
        />
        <TaskColumn
          title="In Review"
          tasks={tasks.inReview}
          onDropTask={(taskId) => handleDropTask(taskId, "inReview")}
        />
        <TaskColumn
          title="Done"
          tasks={tasks.done}
          onDropTask={(taskId) => handleDropTask(taskId, "done")}
        />
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Create New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div>
                <label
                  htmlFor="assignee"
                  className="block text-sm font-medium mb-2"
                >
                  Assignee
                </label>
                <select
                  id="assignee"
                  value={selectedAssignee || ""}
                  onChange={(e) => setSelectedAssignee(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Assignee</option>
                  {dummyUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="points"
                  className="block text-sm font-medium mb-2"
                >
                  Points
                </label>
                <input
                  type="number"
                  id="points"
                  value={taskPoints}
                  onChange={(e) => setTaskPoints(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium mb-2"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium mb-2"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
