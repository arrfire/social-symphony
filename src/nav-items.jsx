import { HomeIcon, Share2Icon } from "lucide-react";
import Index from "./pages/Index.jsx";
import SocialMediaPoster from "./pages/SocialMediaPoster.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Social Media Poster",
    to: "/social-media-poster",
    icon: <Share2Icon className="h-4 w-4" />,
    page: <SocialMediaPoster />,
  },
];
