import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";
import SideBar from "./components/SideBar";
function App() {
  const [pageState, setPageState] = useState({ selectedProject: undefined, projects: [{ id: 0, projectName: "Demo Project", description: "This is a demo project", dueDate: "2023-12-28", tasks: [{ id: 0, taskName: "Hello World" }] },] });
  let selectedProjectIndex = 0


  function handlePageStateChange(selectedProject, projects = pageState.projects) {
    setPageState((prevState) => { return { ...prevState, selectedProject, projects: projects } });
  }

  function updateSelectedProjectIndex() {
    pageState.projects.findIndex((project) => project.id === pageState.selectedProject);
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

  return (
    <main className="h-screen my-8 flex gap-8" >
      <SideBar selectedProject={pageState.selectedProject} projectList={pageState.projects} onPageChangeTo={handlePageStateChange} />
      {pageState.selectedProject === undefined && <NoProjectSelected onPageChangeTo={handlePageStateChange} />}
      {pageState.selectedProject === -1 && <NewProject onPageChangeTo={handlePageStateChange} projectList={pageState.projects} />}
      {pageState.selectedProject >= 0 && <SelectedProject id={pageState.selectedProject} projectList={pageState.projects} onPageChangeTo={handlePageStateChange} onNewTaskAdd={handleAddTask} onRemoveTask={handleRemoveTask} />}
    </main>
  );
}

export default App;
