import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div style={{height: "100vh", backgroundColor: "black", color: "white", textAlign: "center"}}>
            <h1>404</h1>
            <h2>Results Not Found</h2>
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    );
}

export default NotFound;