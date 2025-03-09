import { usePathname, useRouter } from "next/navigation";
import styles from "@/style/page.module.scss";

function BarPanel() {
    const router = useRouter();
    const pathName = usePathname();
    const onExit = () => router.push("/home");
    
    const resumeMatch = pathName.startsWith("/home/resume");
    const aboutMatch = pathName.startsWith("/home/about");
    const othersMatch = pathName.startsWith("/home/game_app");
    const projectMatch = pathName.startsWith("/home/project");
    const githubMatch = pathName.startsWith("/home/github");

    return (
        <div className={styles["bar-wrapper"]}>
            {resumeMatch && <button className="bar-item" onClick={onExit}>Resume</button>}
            {aboutMatch && <button className="bar-item" onClick={onExit}>About</button>}
            {othersMatch && <button className="bar-item" onClick={onExit}>GameApp</button>}
            {githubMatch && <button className="bar-item" onClick={onExit}>GitHub</button>}
            {projectMatch && <button className="bar-item" onClick={onExit}>Project</button>}
        </div>
    )
}

export default BarPanel