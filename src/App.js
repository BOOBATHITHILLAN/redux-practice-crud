import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {

    const[value,setValue]=useState([]);

    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const updateVote = (id) => {
        dispatch({
            type: 'INCR_VOTE',
            payload: {
                id
            }
        });
    };


    const addAnecdote = (e) => {
        e.preventDefault();
        const content = e.target.AddVote.value;
        const id = (state[state.length - 1].id) + 1
        dispatch({
            type: "AddVote",
            payload: {
                id: id,
                content,
                votes: 0
            }
        })

        e.target.AddVote.value = null
    }

    const deleteAnecdote = (id) => {
        dispatch({
            type: "DelVote",
            payload: { id }
        })
    }

    const editVote=(id)=>{
        dispatch({
            type: "EditVote",
            payload: { id }
        })

        let content=state.find(anecdote=>anecdote.id===id);
        setValue(content.content);
    }

    const editSave=(id)=>{ 
        
        const content=value;
        
        dispatch({
            type: "EditSave",
            payload: {  
                id,              
                content                
            }
        })
    }



    return (
        <div className='container bg-dark bg-gradient bg-opacity-25' >
            <div className='row'>
                <div className='col text-center'>
                    <h1 className='fw-bold text-white'>React redux - crud practice</h1>
                </div>
            </div>
            <div className='row '>
                <div className='col text-center'>
                    <form onSubmit={addAnecdote}>
                        <input type='text'  className='form-control mb-1' placeholder='Anecdote...' name='AddVote' />
                        <button className='btn btn-primary' type='submit'>Add-Anecdote</button>
                    </form>
                </div>
            </div>
            <div className='mb-3'>

                {
                    state.map((item, index) => (
                        !item.edit ? (                            
                            <div key={index} className='mb-2'>
                                <p className='fw-bold fs-5'>{index + 1} - {item.content}</p>
                                <button className='btn btn-secondary fw-bold m-1'>has {item.votes} vote</button>
                                <button className='btn btn-primary ms-1' onClick={() => updateVote(item.id)}>vote</button>
                                <button className='btn btn-warning ms-5 m-1' onClick={()=>editVote(item.id)}>Edit</button>
                                <button className='btn btn-danger ms-1' onClick={() => deleteAnecdote(item.id)}>Delete</button>
                            </div>) : (
                            <div key={index} className='mb-2'>
                                <form onSubmit={()=>editSave(item.id)}>
                                    <input className='form-control mb-1 mt-3'placeholder='Anecdote...' name='EditVote' value={value} onChange={(e)=>setValue(e.target.value)}/>
                                    <button className='btn btn-primary' type='submit'>Save</button>
                                </form>
                            </div>
                        )
                    ))
                }
            </div>




        </div>
    )
}

export default App;