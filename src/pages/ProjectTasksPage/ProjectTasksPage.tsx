import React from 'react'

import { Search } from '../../components/Search/Search'
import { Modal } from '../../components/Modal/Modal'
import { AddTodo } from '../../components/AddTodo/AddTodo'
import { Column } from '../../components/Column/Column'

import { useAppSelector } from '../../store/hooks'
import { useDispatch } from 'react-redux'

import { openModal, closeModal } from '../../store/modalReducer/actions'
import { clearDesc, updateTodos } from '../../store/entityReducer/actions'

import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import styles from './ProjectTasksPage.module.css'

import { ITodo } from '../../store/entityReducer/entityReducer'

export const ProjectTasksPage = () => {

  const dispatch = useDispatch()
  const projectName = useAppSelector(state => state.entityReducer.currentProject?.projectName)
  const todos = useAppSelector(state => state.entityReducer.currentProject?.todos)
  const filterTodos = useAppSelector(state => state.entityReducer.filterTodos)
  const modal = useAppSelector(state => state.modalReducer)

  const handleOpen = () => {
    dispatch(openModal('createTodo'))
  }

  const handleClearDesc = () => {
    dispatch(clearDesc())
  }

  const initialColumns = [
    {
      id: 'queue',
      list: filterTodos.queue.length !== 0? filterTodos.queue : todos!.queue
    },
    {
      id: 'development',
      list: filterTodos.development.length !== 0? filterTodos.development : todos!.development
    },
    {
      id: 'done',
      list: filterTodos.done.length !== 0? filterTodos.done : todos!.done
    }
  ]

  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start: [] = todos![source.droppableId as keyof typeof todos];
    const finish: [] = todos![destination.droppableId as keyof typeof todos];

    if (source.droppableId === destination.droppableId) {
      let temp = start[source.index]
      start[source.index] = start[destination.index]
      start[destination.index] = temp

      let newTodos = {
        ...todos,
        [source.droppableId]: {
          ...start
        }
      }

      return dispatch(updateTodos(newTodos))

    } else {
      finish.splice(destination.index, 0, start[source.index])
      start.splice(source.index, 1)
  
      let newTodos = {
        ...todos,
        [source.droppableId]: {
          ...start
        },
        [destination.droppableId]: {
          ...finish
        }
      }

      return dispatch(updateTodos(newTodos))
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.actions}>
          <div className={styles.titleWrapper}>
            <p className={styles.title}>{projectName}</p>
            <Search />
          </div>
          <div className={styles.btnWrapper}>
            <button className={`${styles.btn} ${styles.create}`} onClick={handleOpen}>Add todo</button>
            <button className={`${styles.btn} ${styles.clear}`} onClick={handleClearDesc}>Clear desk</button>
          </div>
        </div>
        <div className={styles.container}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {initialColumns.map((el: { id: string; list: ITodo[] }) => (
              <Column title={el.id} todos={el.list} key={el.id} />
            ))}
          </DragDropContext>
        </div>
      </div>
      {modal.open && modal.type === 'createTodo' && 
        <Modal>
          <AddTodo />
        </Modal>
      }
    </>
  )
}
