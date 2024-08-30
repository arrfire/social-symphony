import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Social Media Poster</h1>
        <p className="text-xl text-gray-600 mb-6">Post to multiple social media platforms with ease!</p>
        <Button asChild>
          <Link to="/social-media-poster">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
