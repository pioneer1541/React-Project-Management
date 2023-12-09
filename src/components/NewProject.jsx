import { useRef, useState } from "react";

import Input from "./Input";
import Modal from "./Modal";
export default function NewProject({ onPageChangeTo, projectList }) {
    const projectNameRef = useRef();
    const projectDescriptionRef = useRef();
    const projectDueDateRef = useRef();
    const modalRef = useRef();
    const [errorMeassage, setErrorMeassage] = useState("")
    function handleSaveProject() {
        const newProject = {
            id: projectList.length,
            projectName: projectNameRef.current.value,
            description: projectDescriptionRef.current.value,
            dueDate: projectDueDateRef.current.value,
            tasks: []
        };
        if (!checkIfInputValid(newProject)) {
            modalRef.current.open();
            return;
        }
        handleAddProject(newProject);
    }

    function handleAddProject(newProject) {

        onPageChangeTo(newProject.id, [...projectList, newProject]);
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

    return (
        <>
            <Modal ref={modalRef} ><h2 className="text-xl font-bold text-stone-900 my-4">{errorMeassage}</h2></Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li><button onClick={() => { onPageChangeTo(undefined) }} className="text-stone-800 hover:text-stone-950">Cancel</button></li>
                    <li><button onClick={handleSaveProject} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button></li>
                </menu>
                <div>
                    <Input label="Project Name" id="projectName" ref={projectNameRef} />
                    <Input inputType="textarea" label="Description" id="description" ref={projectDescriptionRef} />
                    <Input label="Due Date" type="date" id="due_date" ref={projectDueDateRef} />
                </div>

            </div>
        </>
    );
}