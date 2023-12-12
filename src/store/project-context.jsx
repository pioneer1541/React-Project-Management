import { createContext, useState } from "react";

export const ProjectContext = createContext(
    {
        selectedProject: undefined,
        projects: [],
        pageState: {},
        onPageChangeTo: () => { },
        onNewTaskAdd: () => { },
        onRemoveTask: () => { }
    }

);

export default function ProjectContextProvider({ children }) {
    const [pageState, setPageState] = useState({ selectedProject: undefined, projects: [{ id: 0, projectName: "Demo Project", description: "This is a demo project", dueDate: "2023-12-28", tasks: [{ id: 0, taskName: "Hello World" }] },] });
    let selectedProjectIndex = 0


    function handlePageStateChange(selectedProject, projects = pageState.projects) {
        setPageState((prevState) => { return { ...prevState, selectedProject, projects: projects } });
    }

    function updateSelectedProjectIndex() {
        selectedProjectIndex = pageState.projects.findIndex((project) => project.id === pageState.selectedProject);
    }


    function handleAddTask(taskName) {
        updateSelectedProjectIndex();
        let newProjectList = [...pageState.projects];
        const newIndex = newProjectList[selectedProjectIndex].tasks.length;
        const newTask = { id: newIndex, taskName: taskName };
        newProjectList[selectedProjectIndex].tasks.push(newTask);
        handlePageStateChange(pageState.selectedProject, newProjectList)
    }

    function handleRemoveTask(taskIndex) {
        updateSelectedProjectIndex();
        let newProjectList = [...pageState.projects];
        newProjectList[selectedProjectIndex].tasks.splice(taskIndex, 1);
        handlePageStateChange(pageState.selectedProject, newProjectList)
    }
    const ProjectContextValue = {
        selectedProject: pageState.selectedProject,
        projects: pageState.projects,
        pageState: pageState,
        onPageChangeTo: handlePageStateChange,
        onNewTaskAdd: handleAddTask,
        onRemoveTask: handleRemoveTask
    }
    return (<ProjectContext.Provider value={ProjectContextValue} >
        {children}
    </ProjectContext.Provider>
    )
}
