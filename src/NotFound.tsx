import { Link } from "react-router-dom";

const NotFound = () =>{
    return (
        <div className="not-found">
            <h5>Not Found</h5>
            <Link to="/home">Go home</Link>
        </div>
    )
}

export default NotFound;