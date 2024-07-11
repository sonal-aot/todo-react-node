/* eslint-disable react/prop-types */
import TaskBox from "./TaskBox";
import "../styles/activeTaskContainer.css";

function ActiveTaskContainer({ getTask, displayEditTaskForm, displayDeleteModal ,handleCheckboxChange }) {
  return (
    <div className="activeTaskContainer">
      <div className="acitveHead"><h1>Active Tasks</h1></div>
      <ul className="taskContainer">
        {console.log(getTask)}

        {getTask && getTask.map((task, index) => (
          <TaskBox key={index} task={task} displayEditTaskForm={displayEditTaskForm} displayDeleteModal={displayDeleteModal} handleCheckboxChange={handleCheckboxChange} />
        ))}
      </ul>
    </div>
  );
}

export default ActiveTaskContainer;
