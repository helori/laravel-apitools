export default new Vuex.Store({
    state: {
        debug: false,
        pendingCount: 0,
        history: [],
        keepCount: 10,
        hasError: false
    },
    mutations: {
        setStatus(state, payload) {
            if(state.debug){
                console.log('setStatus', payload.status, payload.message);
            }
            if(payload.status === 'pending'){
                ++state.pendingCount;
            }else{
                --state.pendingCount;
            }

            state.history.unshift({
                status: payload.status,
                message: payload.message
            });
            if(state.history.length > state.keepCount){
                state.history = state.history.slice(0, state.keepCount);
            }

            state.hasError = false;
            for(var i=0; i<state.history.length; ++i){
                if(state.history[i].status === 'error'){
                    state.hasError = true;
                }
            }
        }
    }
});