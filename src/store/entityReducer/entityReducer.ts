import { RootState } from "../store"
import { getUnixTime } from 'date-fns'

interface IEntityAction {
    type: 'entityReducer/createProject'
    | 'entityReducer/createTodo'
    | 'entityReducer/getLocalState'
    | 'entityReducer/setCurrentProject'
    | 'entityReducer/clearDesc'
    | 'entityReducer/updateTodos'
    | 'entityReducer/filterTodos'
    | 'entityReducer/addComment'
    payload?: any
}

export interface IComment {
    id: number
    author: string
    text: string
    comments: IComment[]
}

export interface ITodo {
    id: string
    title: string
    desc: string
    createdAt: string
    inWorkTime: string
    deadline: string
    priority: 'High' | 'Medium' | 'Low'
    status: 'queue' | 'development' | 'done'
    files: []
    nestTodos: ITodo[]
    comments: IComment[]
}

export interface IProject {
    id: number
    projectName: string
    todos: {
        queue: ITodo[] | []
        development: ITodo[] | []
        done: ITodo[] | []
    }
}

interface IState {
    projects: IProject[]
    currentProject: IProject | null
    filterTodos: {
        queue: ITodo[],
        development: ITodo[],
        done: ITodo[]
    }
}

const InitialState = {
    projects: [],
    currentProject: null,
    filterTodos: {
        queue: [],
        development: [],
        done: []
    }
} as IState


export const entityReducer = (state = InitialState, { type, payload }: IEntityAction): IState => {
    switch (type) {
        case 'entityReducer/createProject':
            return {
                ...state,
                projects: [...state.projects, { id: getUnixTime(new Date()), projectName: payload, todos: { development: [], done: [], queue: [] } }]
            }
        case "entityReducer/createTodo":
            let projects = state.projects.map(project => {
                return project.id === state.currentProject?.id
                    ? { ...state.currentProject, todos: { ...state.currentProject.todos, queue: [...state.currentProject.todos.queue, payload] } }
                    : project
            })
            return {
                ...state,
                //@ts-ignore
                currentProject: {
                    ...state!.currentProject,
                    todos: {
                        ...state.currentProject!.todos,
                        queue: [...state.currentProject!.todos.queue, payload]
                    }
                },
                projects: projects
            }
        case 'entityReducer/getLocalState':
            let store = localStorage.getItem('store')
            if (typeof store === 'string') {
                var parseStore: RootState = JSON.parse(store)
                return {
                    ...state,
                    currentProject: parseStore.entityReducer.currentProject,
                    projects: parseStore.entityReducer.projects
                }
            } else return state
        case 'entityReducer/setCurrentProject':
            return {
                ...state, currentProject: payload
            }
        case 'entityReducer/clearDesc':
            let projectsWithClearDesc = state.projects.map(project => {
                return project.id === state.currentProject?.id
                    ? { ...state.currentProject, todos: { development: [], done: [], queue: [] } }
                    : project
            })
            return {
                ...state,
                //@ts-ignore
                currentProject: {
                    ...state.currentProject,
                    todos: { development: [], done: [], queue: [] },
                },
                projects: projectsWithClearDesc
            }
        case 'entityReducer/updateTodos':
            let projectsWithUpdateTodos = state.projects.map(project => {
                return project.id === state.currentProject?.id
                    ? { ...state.currentProject, ...payload }
                    : project
            })
            return {
                ...state,
                //@ts-ignore
                currentProject: {
                    ...state.currentProject,
                    ...payload,
                },
                projects: projectsWithUpdateTodos
            }
        case "entityReducer/filterTodos":
            let copyQueue = [...state.currentProject!.todos.queue]
            let copyDevelopment = [...state.currentProject!.todos.development]
            let copyDone = [...state.currentProject!.todos.done]

            let filterQueue = copyQueue.filter((todo, i) => {
                console.log(payload)
                if (todo.title.includes(payload) || i + 1 == payload) {
                    return todo
                }
            })
            let filterDevelopment = copyDevelopment.filter((todo, i) => {
                if (todo.title.includes(payload) || i + 1 == payload) {
                    return todo
                }
            })
            let filterDone = copyDone.filter((todo, i) => {
                if (todo.title.includes(payload) || i + 1 == payload) {
                    return todo
                }
            })
            return {
                ...state,
                filterTodos: {
                    queue: filterQueue.length !== 0 ? filterQueue : [],
                    development: filterDevelopment.length !== 0 ? filterDevelopment : [],
                    done: filterDone.length !== 0 ? filterDone : []
                }
            }
        case 'entityReducer/addComment':
            //@ts-ignore
            let currentStatus: ITodo[] = state!.currentProject!.todos[payload.status]
            let currentTask = currentStatus.map(todo => {
                if (todo.id === payload.taskId && !payload.replyId) {
                    return { ...todo, comments: [...todo.comments, { id: getUnixTime(new Date()), author: payload.author, text: payload.text, comments: [] }] }
                } else {
                    return { ...todo, comments: [...todo.comments, { id: getUnixTime(new Date()), author: payload.author, text: payload.text, comments: [] }] }
                }
            })
            let projectsWithUpdateComments = state.projects.map(project => {
                return project.id === state.currentProject?.id
                    ? { ...state.currentProject, todos: { ...state.currentProject.todos, [payload.status]: [...currentTask] } }
                    : project
            })
            return {
                ...state,
                //@ts-ignore
                currentProject: {
                    ...state!.currentProject,
                    todos: {
                        ...state.currentProject!.todos,
                        [payload.status]: [...currentTask]
                    }
                },
                projects: projectsWithUpdateComments
            }
        default:
            return state
    }
}

