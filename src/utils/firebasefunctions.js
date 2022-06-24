import { get, ref, remove, set } from "@firebase/database"
import { db } from "../firebase.config";

export const saveItem = async (data) => {
    
    set(ref(db, `todos/${data.userId}/${data.day}/${data.index}`),{
        todo: data.todo,
        done: data.done
    });
    

}

export const getItems = async (data) => {

    const toDosRef = ref(db,`todos/${data.userId}`);

    return await get(toDosRef).then((snapshot) => {
        const data  = snapshot.val();
        return data;
    });

}

export const deleteItems = async (data) => {
    await remove(ref(db, `todos/${data.userId}/${data.day}`));
}