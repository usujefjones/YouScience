import React, {useEffect, useState} from 'react';
import { ListItemDrawer } from '../ListItemDrawer';
import './styles.css';
import Edit from '../../assets/edit-246.png';
import Delete from '../../assets/delete.png';
import Checkmark from '../../assets/checkmark.png';

export function CustomList(props) {

  return (
    <div className='listContainer'>
      {props.taskList.map((item, index) => (
          <div className='taskItem' key={index}>
            <div className='rowSpace'>
              <div className='taskName'>{item.name}</div>
              <div>
                <img src={Edit} alt={'edit'} className='icon' onClick={() => {
                  props.handleEdit(item);
                  props.setOpenDrawer(!props.isOpenDrawer);
                }}/>
                <img src={Delete} alt={'delete'} className='icon' onClick={() => {
                  props.setOpenDialogConfirm(true);
                  props.setDeleteTaskId(item.id);
                }}/>
                <img src={Checkmark} alt={'confirm'} className='icon' onClick={() => {
                  props.submitTaskComplete(item.id);
                }}/>
              </div>
            </div>
            <div className='rowSpace'>
              <div className='taskDescription'>
                {item.description}
              </div>
              <div className='taskStatus'>
                {item.status}
              </div>
            </div>
          </div>
      ))}
      <ListItemDrawer isOpenDrawer={props.isOpenDrawer}
                      setOpenDrawer={props.setOpenDrawer}
                      submitTask={props.submitTask}
                      statusList={props.statusList}
                      editMode={props.editMode}
                      editTask={props.editTask}/>
    </div>
  );
}

