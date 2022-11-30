interface IModalAction {
    type: 'modal/open' | 'modal/close'
    payload?: 'createTodo' | 'editTodo' | 'comments' | 'createProject'
}

interface IState {
    open: boolean
    type?: 'createTodo' | 'editTodo' | 'comments' | 'createProject'
}

const InitialState = {
    open: false,
    type: undefined
} as IState


export const modalReducer = (state = InitialState, { type, payload }: IModalAction): IState => {
    switch (type) {
        case 'modal/open':
            return { open: true, type: payload }
        case 'modal/close': 
            return { open: false } 
        default:
            return state
    }
}

