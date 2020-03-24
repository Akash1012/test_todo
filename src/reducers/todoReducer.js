
const initialState = {
    // items: [{ name1: 'Akash',key:1 },
    // { name1: 'Akash',key:2 }],
    item: {},
    todoData:[]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ONDELETE': {
            return {
                ...state,
                todoData: state.todoData.filter(element => (
                  element.id !== action.payload
                ))
            }
        }
        case 'NEW_POST': {
            return {
                ...state,
                todoData:state.todoData.concat(action.payload)
            }
        }
        default:
            return state
    }
}