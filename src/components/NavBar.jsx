import React, { useState, useRef, useEffect } from 'react';
import './NavBar.css';
import DisplayIcon from '../assets/icons_FEtask/Display.svg';

const NavBar = ({ groupBy, setGroupBy, orderBy, setOrderBy }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown menu

  const handleGroupByChange = (value) => {
    setGroupBy(value);
  };

  const handleOrderByChange = (value) => {
    setOrderBy(value);
  };

  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="left-section">
          <button
            className="display-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img src={DisplayIcon} alt="Display icon" className="display-icon" />
            <span className="icon-text">Display</span>
          </button>

          {showDropdown && (
            <div className="dropdown-menu" ref={dropdownRef}>
              <div className="dropdown-item">
                <label htmlFor="groupBy">Grouping:</label>
                <select
                  id="groupBy"
                  value={groupBy} // Use the passed value here
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
                  value={orderBy} // Use the passed value here
                  onChange={(e) => handleOrderByChange(e.target.value)}
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
