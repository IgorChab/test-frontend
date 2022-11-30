import React, { ChangeEvent, FormEvent, useState } from 'react'

import { ProjectListItem } from '../../components/ProjectListItem/ProjectListItem'
import { Modal } from '../../components/Modal/Modal'

import { useDispatch } from 'react-redux'
import {useAppSelector} from '../../store/hooks'

import { openModal, closeModal} from '../../store/modalReducer/actions'
import { createProject, setCurrentProject } from '../../store/entityReducer/actions'

import { useNavigate } from 'react-router-dom'

import styles from './ChoseProjectPage.module.css'
import { IProject } from '../../store/entityReducer/entityReducer'


export const ChoseProjectPage = () => {

    const dispatch = useDispatch()

    const modal = useAppSelector(state => state.modalReducer)

    const projects = useAppSelector(state => state.entityReducer.projects)

    const handleOpen = () => {
        dispatch(openModal('createProject'))
    }

    const [projectName, setProjectName] = useState('')

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value)
    }

    const handleCreateProject = (e: FormEvent) => {
        e.preventDefault()
        dispatch(createProject(projectName))
        dispatch(closeModal())
    }

    const navigate = useNavigate()

    const pickProject = (projectName: IProject) => {
        dispatch(setCurrentProject(projectName))
        navigate('/task')
    }

  return (
    <>
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.listTitle}>
                    <p>Choose project</p>
                </div>
                <div className={styles.listWrapper}>
                    {projects.map((project) => (
                        <div onClick={() => pickProject(project)} key={project.id}>
                            <ProjectListItem projectName={project.projectName}/>
                        </div>
                    ))}
                    {projects.length === 0 && <p>Projects not found</p>}
                </div>
                <div className={styles.btnCenter}>
                    <button className={styles.btn} onClick={handleOpen}>
                        Create Project
                    </button>
                </div>
            </div>
        </div>
        {
            modal.open && modal.type === 'createProject' && 
            <Modal>
                <form onSubmitCapture={handleCreateProject}>
                    <p className={styles.modalTitle}>Enter project name</p>
                    <input type="text" className={styles.input} autoFocus onChange={handleName}/>
                    <button className={styles.createProjectBtn}>
                        Create
                    </button>
                </form>
            </Modal>
        }
    </>
  )
}
