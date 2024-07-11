import searchIcon from "../assets/images/searchIcon.svg";
import "../styles/header.css";

// eslint-disable-next-line react/prop-types
const Header = ({ displayTaskForm , sortOption , handleSortChange ,handleSearch}) => {


    return (
        <div className="header">
            <div className="topHeader">
                <h2>My Tasks</h2>
                <button onClick={() => displayTaskForm(true)}>Add Task</button>
            </div>


            <div className="lowHeader">
                <div className="searchBox">
                    <input type="search" name="search" id="search" placeholder="Search by task name " onChange={(e)=>handleSearch(e.target.value)} />
                    <img src={searchIcon} alt="searchIcon" />
                </div>
                <div className="dropBox">
                    <label htmlFor="sortTask">Sort by :</label>
                <select name="sortTask" id="sortTask" value={sortOption} onChange={(e)=>handleSortChange(e.target.value)}>
                    <option className="option" value="Newest First" selected>
                        Newest first
                    </option>
                    <option className="option" value="Oldest First">Oldest first</option>
                </select>
                </div>
            </div>
        </div>
    );
};

export default Header;
