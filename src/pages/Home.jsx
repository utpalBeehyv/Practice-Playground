import { Link } from "react-router-dom";
import routes from "../routes";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Practice Playground</h1>
      <p className="home-subtitle">
        Each card below is a small, self-contained exercise living on its own route.
      </p>

      <div className="topic-grid">
        {routes.map(({ path, title, description }) => (
          <Link key={path} to={path} className="topic-card">
            <h2>{title}</h2>
            <p>{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
