import NavBar, { Footer } from "./navbar";
import Dashboard from "./dashboard";

const Home = () => {
    return (
        <div className="main">
            <NavBar/>
            <Dashboard/>
            <Footer />
        </div>
    );
}

export default Home;