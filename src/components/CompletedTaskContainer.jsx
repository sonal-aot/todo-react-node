/* eslint-disable react/prop-types */
import TaskBox from "./TaskBox";
import "../styles/activeTaskContainer.css";

function CompletedTaskContainer({ getTask, displayEditTaskForm, displayDeleteModal, handleCheckboxChange , clearCompletedTasks}) {
  return (
    <div className="activeTaskContainer">
      <div className="completedHead">
        <h1>Completed Tasks</h1>
        <button className="clearBtn" onClick={clearCompletedTasks}>Clear Completed Tasks</button>
      </div>
      <ul className="taskContainer">
        {getTask && getTask.map((task, index) => (
          <TaskBox
            key={index}
            task={task}
            displayEditTaskForm={displayEditTaskForm}
            displayDeleteModal={displayDeleteModal}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </ul>
    </div>
  );
}

export default CompletedTaskContainer;
