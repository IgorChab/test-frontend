import { IProject, ITodo } from "./entityReducer"
import {getUnixTime} from 'date-fns'

export const createProject = (payload: string) => {
    return {
        type: 'entityReducer/createProject',
        payload: payload
    }
}

interface TodoCreationDto {
    title: string
    desc: string
    deadline: string
    priority: string
    createdAt: string
    files: string[] | []
}

export const createTodo = (payload: TodoCreationDto) => {
    return {
        type: 'entityReducer/createTodo',
        payload: {
            ...payload,
            id: getUnixTime(new Date()),
            inWorkTime: '',
            status: 'queue',
            nestTodos: [],
            comments: []
        }
    }
}

export const getLocalState = () => {
    return {
        type: 'entityReducer/getLocalState'
    }
}

export const setCurrentProject = (payload: IProject) => {
    return {
        type: 'entityReducer/setCurrentProject',
        payload: payload
    }
}

export const clearDesc = () => {
    return {
        type: 'entityReducer/clearDesc',
    }

}

export const updateTodos = (payload: any) => {
    return {
        type: 'entityReducer/updateTodos',
        payload: payload
    }
}

export const filterTodos = (payload: string) => {
    return{
        type: 'entityReducer/filterTodos',
        payload
    }
}

export const addComment = (payload: {author: string, text: string, taskId: string, status: string, replyId: number | null}) => {
    return {
        type: 'entityReducer/addComment',
        payload
    }
}


