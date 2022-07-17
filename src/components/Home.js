import NavBar from "./navbar";
import Dashboard from "./dashboard";

const Home = () => {
    return (
        <div className="main">
            <NavBar>
                <Dashboard/>
            </NavBar>
        </div>
    );
}

export default Home;