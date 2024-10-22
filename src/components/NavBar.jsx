import React, { useState } from 'react';
import './NavBar.css'; // Ensure to add your custom styling here

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [groupBy, setGroupBy] = useState('Status');
  const [orderBy, setOrderBy] = useState('Priority');

  return (
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
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="Status">Status</option>
                <option value="Users">Users</option>
              </select>
            </div>

            <div className="dropdown-item">
              <label htmlFor="orderBy">Ordering:</label>
              <select
                id="orderBy"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option value="Priority">Priority</option>
                <option value="Date">Date</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
