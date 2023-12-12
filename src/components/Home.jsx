import { useContext } from "react";
import { ProjectContext } from "../store/project-context";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import SelectedProject from "./SelectedProject";
export default function Home() {
    const { selectedProject } = useContext(ProjectContext);
    return (
        <>
            {selectedProject === undefined && <NoProjectSelected />}
            {selectedProject === -1 && <NewProject />}
            {selectedProject >= 0 && <SelectedProject id={selectedProject} />}
        </>

    )
}