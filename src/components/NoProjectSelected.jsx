import { useContext } from 'react';
import { ProjectContext } from '../store/project-context';
import noProjectImage from '../assets/no-projects.png';
import Button from './Button';
export default function NoProjectSelected({ }) {
    const { onPageChangeTo } = useContext(ProjectContext);
    return (
        <div className="mt-4 text-center w-2/3">
            <img className="w-16 h-16 object-contain mx-auto" src={noProjectImage} alt="No Project Selected" />
            <h2 className="text-xl font-bold text-stone-500 my-4">No Project Selected</h2>
            <p className="text-stone-400 mb-4">Select a project from the sidebar or create a new one.</p>
            <p>
                <Button onClick={() => { onPageChangeTo(-1) }} >Create New Project</Button>
            </p>
        </div>
    )
}