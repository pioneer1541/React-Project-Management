import { useContext, useRef, useState } from "react";
import { ProjectContext } from "../store/project-context";

import Error from "../components/Modal/Error";
import Warning from "../components/Modal/Warning";
import Input from "./Input";
import Task from "./Task";
export default function SelectedProject({ id }) {
    const projectNameRef = useRef();
    const projectDescriptionRef = useRef();
    const projectDueDateRef = useRef();
    const errorRef = useRef();
    const warningRef = useRef();
    const [errorMeassage, setErrorMeassage] = useState("")
    const [editable, setEditable] = useState(false);
    const { onPageChangeTo, projects, onNewTaskAdd, onRemoveTask } = useContext(ProjectContext);
    const index = projects.findIndex((project) => project.id === id);
    const warningMessage = "Do you really want to delete this project?";
    let InitialProjectData = projects.find((project) => project.id === id);


    function handleEditProject() {
        if (!editable) {
            setEditable(true);
        } else {
            const newProject = {
                id: id,
                projectName: projectNameRef.current.value,
                description: projectDescriptionRef.current.value,
                dueDate: projectDueDateRef.current.value,
                tasks: projects[index].tasks
            };
            if (!checkIfInputValid(newProject)) {
                handleShowError();
                return;
            }
            handleAddProject(newProject);
        }

    }

    function handleAddProject(newProject) {
        let newProjectList = [...projects];
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



    function handleCancelDelete() {
        warningRef.current.close();
    }

    function handleConfirmDelete() {
        warningRef.current.close();
        let newProjectList = [...projects];
        newProjectList.splice(index, 1);
        onPageChangeTo(undefined, newProjectList)
    }

    function handleShowWarning() {
        warningRef.current.open();
    }

    function handleShowError() {
        errorRef.current.open();
    }

    return (
        <>
            <Warning ref={warningRef} message={warningMessage} onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} > </Warning>
            <Error ref={errorRef} message={errorMeassage} ></Error>
            <div className="w-[35rem] mt-16">
                <header className="pb-4 mb-4 border-b-2 border-stone-300">
                    <menu className="flex items-center justify-end gap-4 my-4">
                        <li><button onClick={() => { onPageChangeTo(undefined) }} className="text-stone-800 hover:text-stone-950">Back</button></li>
                        <li><button onClick={handleShowWarning} className="text-stone-800 hover:text-stone-950" >Delete</button></li>
                        <li><button onClick={handleEditProject} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">{editable ? "Save" : "Edit"}</button></li>
                    </menu>
                    <div>
                        <Input label="Project Name" id="projectName" disabled={!editable} defaultValue={InitialProjectData.projectName} ref={projectNameRef} key={index + InitialProjectData.projectName} />
                        <Input inputType="textarea" label="Description" id="description" disabled={!editable} defaultValue={InitialProjectData.description} ref={projectDescriptionRef} key={index + InitialProjectData.description} />
                        <Input label="Due Date" type="date" id="due_date" disabled={!editable} defaultValue={InitialProjectData.dueDate} ref={projectDueDateRef} key={index + InitialProjectData.dueDate} />
                    </div>
                </header>
                <Task tasks={projects[index].tasks} onNewTaskAdd={onNewTaskAdd} onRemoveTask={onRemoveTask} ></Task>
            </div>
        </>
    );

}