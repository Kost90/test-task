import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <p>The page you are looking does not exist.</p>
      <Link to="/" className="bg-green-300 p-5">Go to the home page</Link>
    </div>
  );
};

export { PageNotFound };
