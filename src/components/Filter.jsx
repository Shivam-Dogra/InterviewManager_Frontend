import React, { useState } from 'react';
import axios from 'axios';

const Filter = ({applyFilters}) => {
    const [interviews, setInterviews] = useState([]);
    const [filters, setFilters] = useState({
        date: '',
        department: '',
        signedUp: '',
      });

      const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
          ...filters,
          [name]: value,
        });
      };
    
      
      const handleApplyFilters = () => {
        applyFilters(filters);
      };
    
    return(
        <div className="filter-container" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center', justifyContent: 'center' }}>
            <label style={{ display: 'flex', flexDirection: 'column', color: 'black', fontSize:'1.1rem' }}>
              
              <input
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                style={{
                  padding: '8px',
                  fontSize: '1.1rem',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  color: 'black',
                }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column',  color: 'black', fontSize:'1.1rem'  }}>
              
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                style={{
                  padding: '8px',
                  fontSize: '1.1rem',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  color: 'black',
                }}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="IT">IT</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column',  color: 'black', fontSize:'1.1rem' }}>
              
              <select
                name="signedUp"
                value={filters.signedUp}
                onChange={handleFilterChange}
                style={{
                  padding: '8px',
                  fontSize: '1.1rem',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  color: 'black',
                }}
              >
                <option value="">Signed Up</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>

            <button
              onClick={handleApplyFilters}
              style={{
                padding: '9px 14px',
                marginTop: '0px',
                backgroundColor: '#c20b0b',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Search 🔍
            </button>
          </div>

    );

}

export default Filter;