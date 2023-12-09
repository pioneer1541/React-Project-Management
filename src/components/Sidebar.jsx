import Button from "./Button";

export default function SideBar({ selectedProject, projectList, onPageChangeTo }) {
  const cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800"
  function onPageJump(pageId) {
    onPageChangeTo(pageId);
  }

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
        <Button onClick={() => { onPageChangeTo(-1) }}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projectList.map((project) => (
          <li className={selectedProject === project.id ? cssClasses + " bg-stone-800 text-stone-200" : cssClasses + " text-stone-400"} key={project.id}>
            <button onClick={() => {
              onPageJump(project.id)
            }}>{project.projectName}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}