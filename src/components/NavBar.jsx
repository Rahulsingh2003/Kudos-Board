import React, { useState, useEffect } from 'react';
import './NavBar.css';

const NavBar = ({ setGroupBy, setOrderBy, updateTasks }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGroupByChange = (value) => {
    setGroupBy(value);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="left-section">
          <button
            className="display-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="icon">&#9881;</span> Display
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <label htmlFor="groupBy">Grouping:</label>
                <select
                  id="groupBy"
                  onChange={(e) => handleGroupByChange(e.target.value)}
                >
                  <option value="Status">Status</option>
                  <option value="User">User</option>
                </select>
              </div>

              <div className="dropdown-item">
                <label htmlFor="orderBy">Ordering:</label>
                <select
                  id="orderBy"
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="Priority">Priority</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
