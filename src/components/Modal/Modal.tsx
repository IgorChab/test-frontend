import React, {PropsWithChildren, FC} from 'react'
import styles from './Modal.module.css'
import {closeModal} from '../../store/modalReducer/actions'
import { useDispatch } from 'react-redux'

export const Modal: FC<PropsWithChildren> = ({children}) => {

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeModal())
    }

  return (
    <div className={styles.backdrop} onClick={handleClose}>
        <div className={styles.content} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}
