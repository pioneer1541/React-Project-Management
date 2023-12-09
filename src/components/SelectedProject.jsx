import { useRef, useState } from "react";

import Input from "./Input";
import Modal from "./Modal";
import Task from "./Task";
export default function SelectedProject({ id, projectList, onPageChangeTo, onNewTaskAdd, onRemoveTask }) {
    const projectNameRef = useRef();
    const projectDescriptionRef = useRef();
    const projectDueDateRef = useRef();
    const modalRef = useRef();
    const [errorMeassage, setErrorMeassage] = useState("")
    const [editable, setEditable] = useState(false);
    const [deleteComfirmed, setDeleteComfirmed] = useState(false);
    const index = projectList.findIndex((project) => project.id === id);
    let InitialProjectData = projectList.find((project) => project.id === id);
    function handleEditProject() {
        if (!editable) {
            setEditable(true);
        } else {
            const newProject = {
                id: id,
                projectName: projectNameRef.current.value,
                description: projectDescriptionRef.current.value,
                dueDate: projectDueDateRef.current.value,
                tasks: projectList[index].tasks
            };
            if (!checkIfInputValid(newProject)) {
                modalRef.current.open();
                return;
            }
            handleAddProject(newProject);
        }

    }

    function handleAddProject(newProject) {
        let newProjectList = [...projectList];
        newProjectList[newProject.id] = newProject;
        setEditable(false);
        onPageChangeTo(newProject.id, newProjectList);
    }

    function checkIfInputValid(newProject) {
        if (newProject.projectName.trim() === "") {
            projectNameRef.current.focus();
            setErrorMeassage("Project name cannot be empty!")
            return false;
        }
        if (newProject.description.trim() === "") {
            projectDescriptionRef.current.focus();
            setErrorMeassage("Description cannot be empty!")
            return false;
        }
        if (newProject.dueDate === "") {
            projectDueDateRef.current.focus();
            setErrorMeassage("Due date cannot be empty!")
            return false;
        }
        setErrorMeassage("")
        return true;
    }



    async function handleDelete() {
        let newProjectList = [...projectList];
        const choice = window.confirm(
            'Are you sure you want to delete everything?'
        );
        if (!choice) {
            return;
        }
        newProjectList.splice(index, 1);
        onPageChangeTo(undefined, newProjectList)
    }


    return (
        <>
            <Modal ref={modalRef} ><h2 className="text-xl font-bold text-stone-900 my-4">{errorMeassage}</h2></Modal>
            <div className="w-[35rem] mt-16">
                <header className="pb-4 mb-4 border-b-2 border-stone-300">
                    <menu className="flex items-center justify-end gap-4 my-4">
                        <li><button onClick={() => { onPageChangeTo(undefined) }} className="text-stone-800 hover:text-stone-950">Back</button></li>
                        <li><button onClick={handleDelete} className="text-stone-800 hover:text-stone-950">Delete</button></li>
                        <li><button onClick={handleEditProject} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">{editable ? "Save" : "Edit"}</button></li>
                    </menu>
                    <div>
                        <Input label="Project Name" id="projectName" disabled={!editable} defaultValue={InitialProjectData.projectName} ref={projectNameRef} key={index + InitialProjectData.projectName} />
                        <Input inputType="textarea" label="Description" id="description" disabled={!editable} defaultValue={InitialProjectData.description} ref={projectDescriptionRef} key={index + InitialProjectData.description} />
                        <Input label="Due Date" type="date" id="due_date" disabled={!editable} defaultValue={InitialProjectData.dueDate} ref={projectDueDateRef} key={index + InitialProjectData.dueDate} />
                    </div>
                </header>
                <Task tasks={projectList[index].tasks} onNewTaskAdd={onNewTaskAdd} onRemoveTask={onRemoveTask} ></Task>
            </div>
        </>
    );

}