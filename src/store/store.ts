import {createStore, combineReducers} from 'redux'
import { modalReducer } from './modalReducer/modalReducer'
import { entityReducer } from './entityReducer/entityReducer'

const rootReducer = combineReducers({
    modalReducer,
    entityReducer
})

export const store = createStore(rootReducer)

store.subscribe(() => localStorage.setItem('store', JSON.stringify(store.getState())))

export type RootState = ReturnType<typeof store.getState>