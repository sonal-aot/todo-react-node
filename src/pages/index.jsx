import { useEffect, useState } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import AddTaskForm from "../components/AddTaskForm";
import Header from "../components/Header";
import "../styles/index.css";
import ActiveTaskContainer from "../components/ActiveTaskContainer";
import DeleteModal from "../components/DeleteModal";
import CompletedTaskContainer from "../components/CompletedTaskContainer";

function Index() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [sortOption, setSortOption] = useState('Newest First');
  const [searchQuery, setSearchQuery] = useState('');

  const hostName = "https://todo-react-node-backend.onrender.com";

  const displayTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  const displayEditTaskForm = (task) => {
    setEditTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskDate(task.date);
    setShowEditTaskForm(true);
  };

  const displayDeleteModal = (taskId) => {
    setDeleteTaskId(taskId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteTaskId(null);
  };

  const handleTitle = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleDate = (e) => {
    setTaskDate(e.target.value);
  };

  const uuidNumber = () => {
    const uuid = uuidv4();
    let uuidNum = (parseInt(uuid.replace(/-/g, ""), 16) % 80000) + 1;
    return uuidNum;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      uuid: uuidNumber(),
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      status: false,
      dateCreated: Date.now()
    };

    try {
      const response = await axios.post(`${hostName}/createTask`, taskData);
      console.log('Task saved successfully:', response.data);
      setShowTaskForm(false);
      setTaskTitle("");
      setTaskDescription("");
      setTaskDate("");
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${hostName}/mytask`);
      setTasks(response.data);
    } catch (error) {
      console.log("Error on getting data", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const taskData = {
      ...editTask,
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
    };

    try {
      const response = await axios.put(`${hostName}/updateTask/${taskData.uuid}`, taskData);
      console.log('Task updated successfully:', response.data);
      setShowEditTaskForm(false);
      setTaskTitle("");
      setTaskDescription("");
      setTaskDate("");
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`${hostName}/deleteTask/${taskId}`);
      console.log('Task deleted successfully:', response.data);
      closeDeleteModal();
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCheckboxChange = async (id) => {
    try {
      const response = await axios.put(`${hostName}/toggleTask/${id}`);
      console.log('Task status updated successfully:', response.data);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const sortTasks = (tasks, option) => {
    switch (option) {
      case 'Newest First':
        return tasks.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      case 'Oldest First':
        return tasks.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated));
      default:
        return tasks;
    }
  };

  const searchTasks = (tasks, query) => {
    if (!query) return tasks;
    const lowerCaseQuery = query.toLowerCase();
    return tasks.filter(task =>
      task.title.toLowerCase().includes(lowerCaseQuery) ||
      task.description.toLowerCase().includes(lowerCaseQuery)
    );
  };


  const clearCompletedTasks = async () => {
    try {
      await axios.delete(`${hostName}/clearTasks`);
      fetchTasks();
    } catch (error) {
      console.error('Error clearing completed tasks:', error);
    }
  };

  const sortedTasks = sortTasks([...tasks], sortOption);
  const filteredTasks = searchTasks(sortedTasks, searchQuery);



  useEffect(() => {
    fetchTasks();
  }, []);

  const activeTasks = filteredTasks.filter(task => !task.status);
  const completedTasks = filteredTasks.filter(task => task.status);

  return (
    <div className="mainContainer">
      <Header displayTaskForm={displayTaskForm} sortOption={sortOption} handleSortChange={handleSortChange}
        handleSearch={handleSearch} />
      {showTaskForm && (
        <AddTaskForm
          setShowTaskForm={setShowTaskForm}
          handleTitle={handleTitle}
          handleDescription={handleDescription}
          handleDate={handleDate}
          handleFunction={handleSubmit}
          taskTitle={taskTitle}
          taskDescription={taskDescription}
          taskDate={taskDate}
          formHead={"Add Task"}
          formButton={"Add Task"}
        />
      )}
      <ActiveTaskContainer getTask={activeTasks} displayEditTaskForm={displayEditTaskForm} displayDeleteModal={displayDeleteModal}
        handleCheckboxChange={handleCheckboxChange} />
      <CompletedTaskContainer getTask={completedTasks} displayEditTaskForm={displayEditTaskForm} displayDeleteModal={displayDeleteModal}
        handleCheckboxChange={handleCheckboxChange}
        clearCompletedTasks={clearCompletedTasks} />

      {showEditTaskForm && (
        <AddTaskForm
          setShowTaskForm={setShowEditTaskForm}
          handleTitle={handleTitle}
          handleDescription={handleDescription}
          handleDate={handleDate}
          handleFunction={handleUpdate}
          taskTitle={taskTitle}
          taskDescription={taskDescription}
          taskDate={taskDate}
          formHead={"Edit Task"}
          formButton={"Update"}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          taskId={deleteTaskId}
          handleDelete={handleDelete}
          closeModal={closeDeleteModal}
        />
      )}
    </div>
  );
}

export default Index;
