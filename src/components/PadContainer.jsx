import React, { useEffect } from 'react'
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import { getItems } from '../utils/firebasefunctions';
import WeekHeader from './WeekHeader'


const PadContainer = () => {

    const [{user},dispatch] = useStateValue();

    const fetchTodos = async() => {
        if(user){
            const data = await getItems({userId: user.uid});
            dispatch({
                type: actionType.SET_TODOS,
                todos: data
            });
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (

    <div className="grid grid-cols-1 md:grid-cols-2">

        <WeekHeader day={"MONDAY"}/>
        <WeekHeader day={"TUESDAY"}/>
        <WeekHeader day={"WEDNESDAY"}/>
        <WeekHeader day={"THURSDAY"}/>
        <WeekHeader day={"FRIDAY"}/>
        <WeekHeader day={"NEXT WEEK"}/>

    </div>
  )
}

export default PadContainer