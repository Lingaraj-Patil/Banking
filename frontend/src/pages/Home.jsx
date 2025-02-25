import { Link } from "react-router-dom";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";

export const Home = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <Heading label="Welcome to PayMent App" />
      <div className="space-y-4 mt-6">
        <Link to="/signin">
          <Button label="Sign In" />
        </Link>
        <Link to="/signup">
          <Button label="Sign Up" />
        </Link>
      </div>
    </div>
  );
};
