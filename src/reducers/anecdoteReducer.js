// step: 1 define a initial state
const initialState = [
    {
        id: 1,
        content: 'But it works in my machine...',
        votes: 0,
        edit:false
    },
    {
        id: 2,
        content: 'If it hurts, do it more often',
        votes: 0,
        edit:false
    },
    {
        id: 3,
        content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        votes: 0,
        edit:false
    },    
    {
        id: 4,
        content: 'Adding manpower to a late software project makes it later!',
        votes: 0,
        edit:false
    }
];

// step: 2 define a reducer function
const anecdoteReducer = (state = initialState, action) => {
    switch (action.type) {

        
        case 'INCR_VOTE':
            const id = action.payload.id;
            const anecdote = state.find(object => object.id === id);
            const changedAnecdote = {
                ...anecdote,
                votes: anecdote.votes + 1
            };

            return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote);


        case 'AddVote':
            return[...state,action.payload]

        
        case 'DelVote':
            return state.filter(v=>v.id!==action.payload.id)


        case 'EditVote':
            const editAnecdote=state.find(anecdote=>anecdote.id===action.payload.id);
            const change={
                ...editAnecdote,edit:true
            }
            return state.map(anecdote=>anecdote.id===action.payload.id?change:anecdote)


        case 'EditSave':            
            const saveAnecdote=state.find(anecdote=>anecdote.id===action.payload.id);
            const savechange={
                ...saveAnecdote,edit:false,content:action.payload.content
            }
            return state.map(anecdote=>anecdote.id===action.payload.id?savechange:anecdote)
            
        default:
            return state;
    }
}

export default anecdoteReducer;