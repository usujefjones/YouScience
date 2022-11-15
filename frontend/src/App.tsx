import React, {useEffect} from 'react';
import './styles.css';
import { CustomList } from './Components/CustomList';
import MyTaskList from './assets/MyTaskList.png';
import Filters from './Components/Filters';
import DialogConfirm from './Components/DialogConfirm';
import {getTasks, createTask, deleteTask, updateTask} from './Actions/tasks.js'

const statusList = ['new', 'complete', 'in progress', 'on hold', 'archived'];

export default function App() {
  const [localStorageInit, setLocalStorageInit] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  const [statusFilter, setStatusFilter] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');
  const [isOpenDrawer, setOpenDrawer] = React.useState(false);
  const [editMode, setEditMode] = React.useState('');
  const [editTask, setEditTask] = React.useState({});
  const [filteredList, setFilteredList] = React.useState(taskList);
  const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);
  const [deleteTaskId, setDeleteTaskId] = React.useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorageInit) {
      setStatusFilter(window.localStorage.getItem('statusFilter'));
      setSearchText(window.localStorage.getItem('searchText'));
      setLocalStorageInit(true);
    }
    retrieveTasks();
  }, [])

  useEffect(() => {
    let newList = Object.assign([], taskList);
    if (searchText) newList = newList.filter(m => m.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || m.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    if (statusFilter && statusFilter.length > 0) newList = newList.filter(m => statusFilter.indexOf(m.status) > -1);
    setFilteredList(newList);
  }, [statusFilter, searchText, taskList])

  async function retrieveTasks() {
    const tasks = await getTasks();
    setTaskList(tasks);
  }

  const handleStatusChange = (statusItem) => {
    let newStatusFilter = Object.assign([], statusFilter);
    if (newStatusFilter.indexOf(statusItem) > -1) {
      newStatusFilter = newStatusFilter.filter(m => m !== statusItem);
    } else {
      newStatusFilter.push(statusItem);
    }
    setStatusFilter(newStatusFilter);
    localStorage.setItem('statusFilter', newStatusFilter);
  }

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    localStorage.setItem('searchText', text);
  }

  const clearFilters = () => {
    setSearchText('');
    localStorage.setItem('searchText', '');
    setStatusFilter([]);
    localStorage.setItem('statusFilter', []);
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorageInit) {
      setStatusFilter(window.localStorage.getItem('statusFilter'));
      setSearchText(window.localStorage.getItem('searchText'));
      setLocalStorageInit(true);
    }
  }, [])

  const handleEdit = (task) => {
    setEditMode('edit');
    setEditTask(task);
  }

  const confirmDelete = (confirmDelete) => {
    Promise.all([deleteTask(deleteTaskId)]).then(() => retrieveTasks());
  }

  async function submitTask(task) {
    if (editMode === 'edit') {
      Promise.all([updateTask(task)]).then(() => retrieveTasks());
    } else {
      Promise.all([createTask(task)]).then(() => retrieveTasks());
    }
    setOpenDrawer(false);
  }

  async function submitTaskComplete(id) {
    let task = taskList.find(m => m.id === id);
    if (task && task.id) {
      task.status = 'complete';
      Promise.all([updateTask(task)]).then(() => retrieveTasks());
    }
    setOpenDrawer(false);
  }

  return (
    <div className='App'>
      <div className='row'>
        <img src={MyTaskList} alt={'My task list'} className='logo'/>
        <div>
          <div className={'column'}>
            <Filters statusList={statusList}
                     statusFilter={statusFilter}
                     searchText={searchText}
                     handleStatusChange={handleStatusChange}
                     handleSearchTextChange={handleSearchTextChange}
                     clearFilters={clearFilters} />
          </div>
        </div>
      </div>
      <div onClick={() => {
        handleEdit({});
        setOpenDrawer(!isOpenDrawer);
        setEditMode('new');
        setEditTask({});
      }} className='buttonLink'>
        + Add a new task
      </div>
      <CustomList taskList={filteredList}
                  isOpenDrawer={isOpenDrawer}
                  setOpenDrawer={setOpenDrawer}
                  handleEdit={handleEdit}
                  submitTask={submitTask}
                  submitTaskComplete={submitTaskComplete}
                  editMode={editMode}
                  editTask={editTask}
                  statusList={statusList}
                  setOpenDialogConfirm={setOpenDialogConfirm}
                  setDeleteTaskId={setDeleteTaskId}
      />
      <DialogConfirm open={openDialogConfirm} taskId={deleteTaskId} confirmDelete={confirmDelete} />
    </div>
  );
}
