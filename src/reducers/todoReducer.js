
const initialState = {
    todoData: [
        {
            key: 1,
            name: 'Start Learning React Hooks',
            date: '31-03-2020'
        },
        {
            key: 2,
            name: 'Give 2hr to Javascript',
            date: '31-03-2020'
        }
    ]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ONDELETE': {
            return {
                ...state,
                todoData: state.todoData.filter(element => (
                    element.key !== action.payload
                ))
            }
        }
        case 'NEW_POST': {
            return {
                ...state,
                todoData: state.todoData.concat(action.payload)
            }
        }
        default:
            return state
    }
}