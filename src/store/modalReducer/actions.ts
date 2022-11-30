export const openModal = (payload: 'createTodo' | 'editTodo' | 'comments' | 'createProject') => {
    return {
        type: 'modal/open',
        payload
    }
}

export const closeModal = () => {
    return {
        type: 'modal/close'
    }
}