import React, { ChangeEvent } from 'react'

import styles from './Search.module.css'

import searchIcon from '../../images/searchIcon.svg'

import { useDispatch } from 'react-redux'
import { filterTodos } from '../../store/entityReducer/actions'

export const Search = () => {

  const dispatch = useDispatch()

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterTodos(e.target.value))
  }

  return (
    <div className={styles.container}>
        <img src={searchIcon} alt="searchIcon" className={styles.img}/>
        <input type='text' placeholder='Enter todo title or number' className={styles.input} onChange={handleValue}/>
    </div>
  )
}
