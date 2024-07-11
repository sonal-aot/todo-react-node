/* eslint-disable react/prop-types */
import Close from "../assets/images/closeIcon.svg";
import "../styles/addTaskForm.css";

function AddTaskForm({
  setShowTaskForm,
  handleTitle,
  handleDescription,
  handleDate,
  handleFunction,
  taskTitle,
  taskDescription,
  taskDate,
  formHead,
  formButton
}) {
  return (
    <form id="addTaskForm" method="post" onSubmit={handleFunction}>
      <div className="formHead">
        <h1>{formHead}</h1>
        <img src={Close} alt="Close" onClick={() => setShowTaskForm(false)} />
      </div>
      <div className="formBody">
        <div className="formTitle">
          <label>Title *</label>
          <input type="text" id="taskTitle" value={taskTitle} onChange={handleTitle} required placeholder="eg: Create two ad banners" />
        </div>
        <div className="formDescription">
          <label>Description</label>
          <textarea id="taskDescription" value={taskDescription} onChange={handleDescription} placeholder="Add your task description." />
        </div>
        <div className="formDate">
          <label>Date</label>
          <input type="date" id="taskDate" value={taskDate} onChange={handleDate} required />
        </div>
      </div>
      <div className="formFooter">
        <button type="button" className="closeBtn" onClick={() => setShowTaskForm(false)}>
          Close
        </button>
        <button type="submit" className="submitBtn">
          {formButton}
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm;
