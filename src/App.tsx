import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './store/hooks';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import {ChoseProjectPage} from './pages/ChoseProjectPage/ChoseProjectPage'
import {ProjectTasksPage} from './pages/ProjectTasksPage/ProjectTasksPage'
import {getLocalState} from './store/entityReducer/actions'

function App() {

  const dispatch = useDispatch()

  const currentProject = useAppSelector(state => state.entityReducer.currentProject)

  useEffect(() => {
    dispatch(getLocalState())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChoseProjectPage/>}/>
        {currentProject && <Route path='/task' element={<ProjectTasksPage/>}/>}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
