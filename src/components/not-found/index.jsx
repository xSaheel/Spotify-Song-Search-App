import { Link } from "react-router-dom";
import { ReactComponent as NotFoundIcon } from "../../assets/not-found.svg";
import classes from "./styles.module.scss";

const NotFound = () => {
    return (
        <div className={classes.root}>
            <NotFoundIcon fill="white" />
            <h2>Sorry! We Couldn't find that..</h2>
            <div>Search something else?</div>
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    );
}

export default NotFound;