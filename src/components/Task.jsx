import NewTask from "./NewTask";

export default function Task({ tasks, onNewTaskAdd, onRemoveTask }) {
    function handleRemoveTask(event) {
        onRemoveTask(event.target.id);
    }
    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <NewTask onNewTaskAdd={onNewTaskAdd} />

            <ul className="p-2 mt-2 rounded-md bg-stone-200">
                {tasks.length <= 0 && <p className="text-stone-800 my-4">This project does not have any tasks yet.</p>}
                {tasks.map((task) => (

                    <li className="flex justify-between gap-4 my-4" key={task.id}>
                        <input type="checkbox" />
                        <span className="text-stone-800">{task.taskName}</span>
                        <button id={task.id} onClick={handleRemoveTask} className="text-stone-700 hover:text-red-500" >Remove</button>
                    </li>

                ))}
            </ul>

        </section>
    )
}