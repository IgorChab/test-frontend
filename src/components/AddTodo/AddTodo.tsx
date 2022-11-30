import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { createTodo } from '../../store/entityReducer/actions'

import {format} from 'date-fns'

import styles from './AddTodo.module.css'
import { closeModal } from '../../store/modalReducer/actions'


export const AddTodo = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [deadline, setDeadline] = useState('')
    const [priority, setPriority] = useState('')
    const [files, setFiles] = useState<string[]>([])

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDesc = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.target.value)
    }

    const handleDeadline = (e: ChangeEvent<HTMLInputElement>) => {
        setDeadline(format(new Date(e.target.value), 'dd.MM.yyyy'))
    }

    const handlePrioprity = (e: ChangeEvent<HTMLInputElement>) => {
        setPriority(e.target.value)
    }

    const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
        setFiles(Array.from(e.target.files || []).map(file => file.name))
    }

    const handleCreateTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(title.trim().length === 0){
            return alert('Title is required')
        } else if(!deadline){
            return alert('Deadline is required')
        }
        dispatch(createTodo({title, desc, deadline, priority, createdAt: format(new Date(), 'dd.MM.yyyy'), files}))
        dispatch(closeModal())
    }

  return (
    <form className={styles.container} onSubmitCapture={handleCreateTodo}>
        <p className={styles.modalTitle}>Add Task</p>
        <div className={styles.wrap}>
            <div className={`${styles.inputWrapper} ${styles.title}`}>
                <label htmlFor="title">Title*:</label>
                <input type="text" id='title' onChange={handleTitle}/>
            </div>
            <input type='file' multiple onChange={handleFiles}/>
        </div>
        <div className={`${styles.inputWrapper} ${styles.description}`}>
            <label htmlFor="Description">Description:</label>
            <textarea id="Description" rows={3} onChange={handleDesc}></textarea>
        </div>
        <div className={`${styles.inputWrapper} ${styles.deadline}`}>
            <label htmlFor="deadline">Deadline*:</label>
            <input type='date' onChange={handleDeadline}/>
        </div>
        <div className={styles.wrapBtn}>
            <div className={styles.priority}>
                <p>Priority:</p>
                <div>
                    <input type='radio' id='High' value='High' name='priority' onChange={handlePrioprity}/>
                    <label htmlFor='High' className={styles.high}>High</label>
                </div>
                <div>
                    <input type='radio' id='Medium' value='Medium' name='priority' onChange={handlePrioprity}/>
                    <label htmlFor='Medium' className={styles.medium}>Medium</label>
                </div>
                <div>
                    <input type='radio' id='Low' value='Low' name='priority' onChange={handlePrioprity}/>
                    <label htmlFor='Low' className={styles.low}>Low</label>
                </div>
            </div>
            <button className={styles.createBtn} type='submit'>
                Create
            </button>
        </div>
    </form>
  )
}
