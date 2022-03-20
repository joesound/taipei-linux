

export function creatStore(reducer, init_state){
    const state = [init_state];
    const subscriptions = {};
    const reducer = reducer;

    return {
        getState : () => {
            return state[-1]
        },

        subscribe : (key, callback) =>{
            subscriptions[key] = callback
        },

        dispatch : (action) =>{
            reducer(action)
        },

        updateState : (new_state) => {
            state.push(new_state)
        }
    }
}


