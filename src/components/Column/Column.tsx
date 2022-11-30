import React, { FC } from 'react'

import styles from './Column.module.css'

import {Draggable, Droppable} from 'react-beautiful-dnd'

import { ITodo } from '../../store/entityReducer/entityReducer'

import { TaskItem } from '../../components/TaskItem/TaskItem'

interface ColumnProps {
    title: string
    todos: ITodo[]
}


export const Column: FC<ColumnProps> = ({title, todos}) => {
  return (
    <div className={styles.column}>
        <p className={styles.columnTitle}>{title}</p>
        <Droppable droppableId={title}>
            {(provided) => (
                <div className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>
                    {todos.map((todo, i) => (
                        <Draggable key={todo.id} draggableId={todo.id.toString()} index={i}>
                            {(provided) => (
                                <div key={todo.id} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <TaskItem
                                        id={todo.id}
                                        index={(i + 1).toString()}
                                        createdAt={todo.createdAt}
                                        deadline={todo.deadline}
                                        desc={todo.desc}
                                        files={todo.files}
                                        priority={todo.priority}
                                        title={todo.title}
                                        comments={todo.comments}
                                        inWorkTime={todo.inWorkTime}
                                        nestTodos={todo.nestTodos}
                                        status={todo.status}
                                    />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
  )
}
