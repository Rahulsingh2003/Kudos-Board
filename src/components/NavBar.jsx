import React, { useState, useRef, useEffect } from 'react';
import './NavBar.css';
import DisplayIcon from '../assets/icons_FEtask/Display.svg';

const NavBar = ({ groupBy, setGroupBy, orderBy, setOrderBy }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); 

  const handleGroupByChange = (value) => {
    setGroupBy(value);
  };

  const handleOrderByChange = (value) => {
    setOrderBy(value);
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

  
    document.addEventListener('mousedown', handleClickOutside);
    
    
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
                  value={groupBy} 
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
                  value={orderBy} 
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
