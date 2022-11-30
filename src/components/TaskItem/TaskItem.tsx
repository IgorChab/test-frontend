import React, { FC } from 'react'

import styles from './TaskItem.module.css'

import paperClip from '../../images/paperClip.svg'
import commentIcon from '../../images/commentIcon.svg'
import editIcon from '../../images/editIcon.svg'

import { ITodo } from '../../store/entityReducer/entityReducer'

import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store/hooks'

import {Modal} from '../Modal/Modal'
import { Comments } from '../Comments/Comments'

import { openModal, closeModal } from '../../store/modalReducer/actions'

interface TaskItemProps extends ITodo {
  index: string
}

export const TaskItem: FC<TaskItemProps> = ({index, id, title, desc, files, priority, createdAt, deadline, status, comments}) => {
  
  const dispatch = useDispatch()

  const modal = useAppSelector(state => state.modalReducer)

  const handleOpenEditModal = () => {
    dispatch(openModal('editTodo'))
  }

  const handleOpenCommentModal = () => {
    dispatch(openModal('comments'))
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.priority} style={{backgroundColor: priority === 'High'? '#FF0000': priority === 'Medium'? '#FFC633': '#3BD95D'}}></div>
        <div className={styles.wrapper}>
          <div className={styles.titleWrap}>
            <p className={styles.title}>#{index} {title}</p>
            <img src={editIcon} alt="editIcon" style={{cursor: 'pointer'}} onClick={handleOpenEditModal}/>
          </div>
          <div className={styles.dateOfCreation}>
            <p>{`created\n${createdAt}`}</p>
            <div className={styles.circle}></div>
            <p>{`deadline\n${deadline}`}</p>
          </div>
          <p className={styles.description}>{desc}</p>
          <div className={styles.files}>
            {files.length !== 0 && <img src={paperClip} alt="paperClip"/>}
            {files.map((file, i) => (
              <p key={i}>{file}</p>
            ))}
          </div>
          <div className={styles.comment} onClick={handleOpenCommentModal}>
            <img src={commentIcon} alt="commentIcon" />
            <p>{comments.length}</p>
          </div>
        </div>
      </div>
      {modal.open && modal.type === 'comments' && 
        <Modal>
          <Comments taskId={id} status={status} comments={comments}/>
        </Modal>
      }
      {modal.open && modal.type === 'editTodo' && 
        <Modal>
          editTodo
        </Modal>
      }
    </>
  )
}
