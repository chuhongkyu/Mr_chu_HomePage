import { Link } from "react-router-dom";

interface IProps {
    name: string;
    id: string;
    keywords: string[]
    company: string;
}

const ProjectItem = ({name, id, keywords, company }:IProps) => {
    return(
        <li>
            <Link to={`/home/detail/${id.replace(/-/g, '')}`}>
                <article className="mark">
                    <img src={`/assets/project/${name.split(' ').join('')}.jpg`} alt={name.split(' ').join('')}/>
                </article>
                <div className="text">
                    <h3>{name}</h3>
                    <div className="keywords">
                        {keywords.map((el, i)=>{
                            return(
                                <span key={el + i + "KEY"}>{el}</span>
                            )
                        })}
                    </div>
                    <p className="company">{company}</p>
                </div>
                
            </Link>
        </li>
    )
}

export default ProjectItem;