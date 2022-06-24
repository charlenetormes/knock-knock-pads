import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MdClear } from 'react-icons/md';
import { saveItem } from '../utils/firebasefunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import Loader from './Loader';

const DEFAULT_TODO = "Add to do";

const ToDoRow = (props) => {

    const [{user,todos}, dispatch] = useStateValue();
    const [toDo, setToDo] = useState(DEFAULT_TODO);
    const [isChecked, setChecked] = useState(false);
    const [isEdit, startEdit] = useState(false);
    const [isUpdate, setUpdate] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const startEditing = () => {
        startEdit(true);
    }

    const updateData = () => {
        if(isUpdate && user){
            saveToDatabase();
            setUpdate(false);
        }
    }

    const handleFocus = () => {
        if(document.getElementById(`${props.day}-${props.index}`))
            document.getElementById(`${props.day}-${props.index}`).focus();
    }

    const saveOnEnter = (e) => {
        if(e.keyCode === 13){
            startEdit(false);
            e.preventDefault();
            e.target.blur();


            if(e.target.value.length > 0){
                setToDo(e.target.value);
                setUpdate(true);
            }
            else{
                setToDo(DEFAULT_TODO);
            }
    
        }
    }

    const saveOnBlur = (e) => {
        startEdit(false);
        e.preventDefault();
        e.target.blur();


        if(e.target.value.length > 0){
            setToDo(e.target.value);
            setUpdate(true);
        }
        else{
            setToDo(DEFAULT_TODO);
        }
    }

    const setCheckbox = (e) => {
        setChecked(!isChecked);
        setUpdate(true);
    }

    const saveToDatabase = () => {
        saveItem({
            day: props.day,
            index: props.index,
            done: isChecked,
            userId: user.uid,
            todo: toDo  
        });

        let todoCopy = todos;

        if(todoCopy === null){
            todoCopy = {};
        }

        todoCopy[props.day] = [];

        todoCopy[props.day][props.index] = {
            todo: toDo,
            done: isChecked
        };

        dispatch({
            type: actionType.SET_TODOS,
            todos: todoCopy
        });

    }

    const fetchData = async () => {

        if(!user){
            setToDo(DEFAULT_TODO);
            setChecked(false);
        }
        else if (todos && todos[props.day] && todos[props.day][props.index]){
            setToDo(todos[props.day][props.index].todo);
            setChecked(todos[props.day][props.index].done)
        }
        else if(todos && !todos[props.day]){
            setToDo(DEFAULT_TODO);
            setChecked(false);
        }

        setTimeout(() => {
            setLoading(false);
        }, 2000);


        
    }

    const clearTodo = () => {
        setToDo(DEFAULT_TODO);
        setChecked(false);
        setUpdate(true);
    }

    useEffect(() => {
        handleFocus();
        fetchData();
        updateData();
    });

  return (
    <div className="bg-white border-b-2 border-orange-300">
        <div className="p-2 flex flex-row items-center">
            {isEdit && (
                <input maxLength="30" className="w-full p-2 focus:outline-0 text-md" id={props.day + "-" + props.index} onBlur={saveOnBlur} onKeyUp={saveOnEnter}></input>
            )}
            {!isEdit && (

                <div className="w-full p-2 items-center cursor-pointer">
                    <div className={isLoading? "flex items-center justify-center" : "flex items-center"}>
                        <div className="form-check">
                            {
                                (function()
                                {   
                                    if(isLoading){
                                        return <Loader className="w-4 h-4"></Loader>
                                    }
                                    else if(!isLoading) {
                                        if(toDo !== DEFAULT_TODO){
                                            return (<div>
                                            <input disabled={toDo === 'Add to do'} checked={isChecked} onChange={setCheckbox} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-orange-600 checked:border-orange-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value={isChecked} id="flexCheckChecked"/>
                                            <label onClick={startEditing} className="form-check-label inline-block text-gray-900 text-md" htmlFor="flexCheckChecked">
                                                {toDo}
                                            </label>
                                            </div>)
                                        }
                                        else if (toDo === DEFAULT_TODO){
                                            return (<div>
                                            <input disabled={toDo === 'Add to do'} checked={isChecked} onChange={setCheckbox} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-orange-600 checked:border-orange-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value={isChecked} id="flexCheckChecked"/>
                                            <label onClick={startEditing} className="form-check-label inline-block text-gray-300 text-md" htmlFor="flexCheckChecked">
                                                {toDo}
                                            </label>
                                            </div>)
                                        }
                                        // {toDo !== DEFAULT_TODO && (
                                        //     <label onClick={startEditing} className="form-check-label inline-block text-gray-900 text-md" htmlFor="flexCheckChecked">
                                        //         {toDo}
                                        //     </label>
                                        // )}
            
                                        // {toDo === DEFAULT_TODO && (
                                        //     <label onClick={startEditing} className="form-check-label inline-block text-gray-400 text-md" htmlFor="flexCheckChecked">
                                        //         {toDo}
                                        //     </label>
                                        // )}
                                    }
                                }())
                            }
                            
                        </div>
                        <motion.div whileTap={{scale:0.6}} className={toDo === DEFAULT_TODO || isLoading? "hidden ml-auto": "ml-auto"}>
                            {props.index < 10 && (<MdClear onClick={clearTodo}></MdClear>)}
                        </motion.div>
                    </div>
                </div>
            )}
            
        </div>
    </div>
  )
}

export default ToDoRow