import  "./error.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="errorWrapper bg-red-100 h-screen">
      <div className="errorHeader">Error 404 - Page not found</div>
      <div className="errorBody">
        <span className="text-black"> Go back to </span>
        <Link to="/" className="homeLink">
          Home page
        </Link>
      </div>
    </div>
  );
}

export default Error;