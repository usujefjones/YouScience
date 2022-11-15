import React, {useEffect, useRef} from 'react';
import { Drawer } from '@mui/material';
import './styles.css';

export function ListItemDrawer(props) {
  const [drawerOpen, openDrawer] = React.useState(false);
  const [id, setId] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState('new');

  useEffect(() => {
    if (props.editTask && props.editTask.name) {
      setId(props.editTask.id);
      setName(props.editTask.name);
      setDescription(props.editTask.description);
      setStatus(props.editTask.status);
    }
  }, [props.editTask])

  useEffect(() => {
    openDrawer(props.isOpenDrawer);
    if (props.isOpenDrawer && props.editMode !== 'edit') {
      clearControls();
    }
  }, [props.isOpenDrawer])

  const checkCompleteStatus = (status) => {
    if (props.editTask.status === 'complete') {
      alert('This task cannot be changed from its complete status.')
    } else {
      setStatus(status);
    }
  }

  const handleSubmit = () => {
    props.submitTask({id, name, description, viewed: false, status})
    clearControls();
  }

  const clearControls = () => {
    setName('');
    setDescription('');
    setStatus('new');
    document.getElementById('description').innerHTML = '';
  }

  return (
    <Drawer
      open={drawerOpen}
      onClose={openDrawer}
      anchor='right'
      variant='persistent'
      style={{ width: 300, flexShrink: 0 }}
    >
      <h2>{props.editMode === 'edit' ? 'Edit Task' : 'New Task'}</h2>
      <div className='column'>
        <div className='editLabel editTightLabel'>Name</div>
        <input value={name} onChange={(e) => setName(e.target.value)} className='editControl' maxLength='32'/>
      </div>
      <div className='column'>
        <div className='editLabel editTightLabel'>Description</div>
        <textarea id='description'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className='editControl editDescription' maxLength='100'/>
      </div>
      <div className='editRadio'>Status options</div>
      {props.statusList && props.statusList.map((m,i) =>
        <div key={i} className='rowRadio'>
          <input type='radio' name='status' checked={status === m} onChange={() => checkCompleteStatus(m)} disabled={props.editTask.status === 'complete'}/>
          <div onClick={() => checkCompleteStatus(m)} className='radioOption'>{m}</div>
        </div>
      )}
      <div className='buttons'>
        <button onClick={() => handleSubmit()} className='button'>{props.editMode === 'edit' ? 'Update' : 'Submit'}</button>
        <div onClick={() => props.setOpenDrawer(false)} className='buttonLink'>Close</div>
      </div>
    </Drawer>
  );
}
