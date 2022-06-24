export const actionType = {
    SET_USER: "SET_USER",
    SET_TODOS: "SET_TODOS"
}


const reducer = (state, action) => {
    console.log(action);

    switch(action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user
            };
        case actionType.SET_TODOS:
            return {
                ...state,
                todos: action.todos 
            };

        default: 
        return state;
    }
};


export default reducer;