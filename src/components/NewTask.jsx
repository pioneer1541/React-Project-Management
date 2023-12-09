import { useState } from 'react';
export default function NewTask({ onNewTaskAdd }) {
    const [newTask, setNewTask] = useState("")
    function handleNewTaskChange(event) {
        setNewTask(event.target.value);
    }
    function handleNewTaskAdd(event) {
        if (!checkIfInputValid(newTask)) {
            return;
        }
        onNewTaskAdd(newTask);
        event.target.previousSibling.value = "";
        setNewTask("");
    }

    function checkIfInputValid(newTask) {
        if (newTask.trim() === "") {
            return false;
        }
        return true;
    }
    return (
        <div className="flex items-center gap-4">
            <input onChange={handleNewTaskChange} defaultValue={newTask} type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-300" />
            <button onClick={handleNewTaskAdd} className="text-stone-700 hover:text-stone-900" >Add Task</button>
        </div>

    )
}