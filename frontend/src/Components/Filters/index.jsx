import React, {useState, useEffect} from 'react';
import './styles.css';

export default function Filters(props) {
  return (
    <div className='container'>
      <div className='header'>
        FILTERS
      </div>
      <div className='row'>
        <div className='column'>
          <div>
            Search:
            <input
              value={props.searchText || ''}
              maxLength={15}
              className='editControl'
              onChange={(e) => props.handleSearchTextChange(e.target.value)}/>
          </div>
          <div className='clearFilter' onClick={() => props.clearFilters()}>x clear filters</div>
        </div>
        <div className='row'>
          Show Status:
          <div>
            {props.statusList && props.statusList.length > 0 && props.statusList.map((m,i) => {
              return (
                <div key={i} className='rowLabel'>
                  <input
                    type='checkbox'
                    checked={props.statusFilter.indexOf(m) > -1}
                    onClick={() => props.handleStatusChange(m)}
                    onChange={() => {}}
                  />
                  <div onClick={() => props.handleStatusChange(m)} className='radioLabel'>
                    {m}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

