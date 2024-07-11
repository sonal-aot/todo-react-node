/* eslint-disable react/prop-types */
import calendarIcon from "../assets/images/calendarIcon.svg";
import dueCalendar from "../assets/images/dueCalendar.svg"
import editIcon from "../assets/images/editIcon.svg";
import deleteIcon from "../assets/images/deleteIcon.svg";
import completedIcon from "../assets/images/completedIcon.svg";
import notCompleted from "../assets/images/pendingIcon.svg";


function TaskBox({ task, displayEditTaskForm, displayDeleteModal, handleCheckboxChange }) {

    const date = new Date(task.date);
    const dateCreated = new Date(task.dateCreated);




    return (
        <li className="taskCard">
            <div>
                <input
                    type="checkbox"
                    name="checkBox"
                    id="checkBox"
                    checked={task.status}
                    onChange={() => handleCheckboxChange(task.uuid)}
                />
            </div>
            <div className="cardBody">
                <div className="cardTitle"><span>
                    {task.title}
                    {task.status ? <img src={completedIcon} alt="Completed" /> : <img src={notCompleted} alt="Not Completed" />}
                </span></div>
                <div className="cardDescription"><p>{task.description}</p></div>
                <div className="cardDate">

                    {date > dateCreated
                        ? <img src={calendarIcon} alt="calendarIcon" />
                        : <img src={dueCalendar} alt="dueCalendar" />

                    }
                    {date > dateCreated
                        ? <span > by {task.date} </span>
                        : <span className="dueDate"> by {task.date} </span>
                    }
                </div>
            </div>
            <div className="editDelete">
                <img src={editIcon} alt="editIcon" onClick={() => displayEditTaskForm(task)} />
                <img src={deleteIcon} alt="deleteIcon" onClick={() => displayDeleteModal(task.uuid)} />
            </div>
        </li>
    );
}

export default TaskBox;
