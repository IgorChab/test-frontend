import React, { FC } from 'react'
import style from './ProjectListItem.module.css'

interface ProjectListItemProps {
    projectName: string
}

export const ProjectListItem: FC<ProjectListItemProps> = ({projectName}) => {
  return (
    <div className={style.container} >
        <p className={style.projectName}>{projectName}</p>
    </div>
  )
}
