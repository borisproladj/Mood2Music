import { useState, useEffect } from "react";
import { Nunito } from "next/font/google";
import Link from "next/link";
import { extractMoodFromURL } from "./moodUtils";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

export default function Navbar() {
  const [currentMood, setCurrentMood] = useState("");

  useEffect(() => {
    const mood = extractMoodFromURL();
    setCurrentMood(mood);
  
    const handleRouteChange = () => {
      const updatedMood = extractMoodFromURL();
      setCurrentMood(updatedMood);
    };
  
    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("pushState", handleRouteChange);
    window.addEventListener("replaceState", handleRouteChange);
  
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("pushState", handleRouteChange);
      window.removeEventListener("replaceState", handleRouteChange);
    };
  }, []);
  

  return (
    <div className="navbar bg-base-300 rounded-box shadow-lg mb-4 md:mb-6 max-w-[40rem] mx-auto">
      <div className="navbar-start w-1/4">
        <Link href="/">
          <button
            className="btn btn-square btn-ghost"
            aria-label="Go to homepage"
          >
            <svg
              width="38px"
              height="38px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#dc2626"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5L21 3V17M21 17C21 18.1046 19.6569 19 18 19C16.3431 19 15 18.1046 15 17C15 15.8954 16.3431 15 18 15C19.6569 15 21 15.8954 21 17ZM9 9L21 7"
                  stroke="#7f7ffe"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </button>
        </Link>
      </div>
      <div className="navbar-center w-1/2 justify-center">
        <div className="text-center font-extrabold text-xl">
          Feeling {currentMood}
        </div>
      </div>
      <div className="navbar-end w-1/4">
        <a
          className={`btn btn-primary btn-square font-extrabold md:btn-block ${nunito.className}`}
          href="/"
        >
          Edit Mood
        </a>
      </div>
    </div>
  );
}
