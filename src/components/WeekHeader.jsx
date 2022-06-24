import React from 'react'
import ToDoRow from './ToDoRow'
import { MdDeleteOutline } from 'react-icons/md'
import { motion } from 'framer-motion'
import { deleteItems, getItems } from '../utils/firebasefunctions'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const WeekHeader = (props) => {

    const [{user}, dispatch] = useStateValue();

    const deleteTodos = async () => {
        await deleteItems({day: props.day, userId: user.uid});
        const data = await getItems({userId: user.uid});

        dispatch({
            type: actionType.SET_TODOS,
            todos: data
        });
    }

  return (
    <div className="border-2 border-orange-300 min-h-225">
            <div className="w-full flex items-center justify-center py-4 bg-orange-200 border-y-2 border-orange-300">
                <p className="ml-auto text-2xl font-semibold text-orange-500">{props.day}</p>
                <motion.div whileTap={{scale:0.6}} className="ml-auto pr-3"><MdDeleteOutline onClick={deleteTodos} className="text-2xl cursor-pointer"></MdDeleteOutline></motion.div>
            </div>  

            {
                [...Array(7)].map((data,i) => {
                    const day = props.day;
                    let emptyObj = {}
                    emptyObj[day] = [];
                    return <ToDoRow key={i} day={props.day} index={i}/>
                })
            }
    </div>
  )
}

export default WeekHeader