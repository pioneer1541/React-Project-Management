import { useContext, useEffect } from 'react';
import Home from './components/Home';
import SideBar from "./components/SideBar";
import ProjectContextProvider, { ProjectContext } from "./store/project-context";


function App() {
  const { selectedProject } = useContext(ProjectContext);
  useEffect(() => {
    console.log("App.jsx: selectedProject changed to", selectedProject)
  }, [selectedProject])
  return (
    <ProjectContextProvider>
      <main className="h-screen my-8 flex gap-8" >
        <SideBar />
        <Home />
      </main>
    </ProjectContextProvider>
  );
}

export default App;
