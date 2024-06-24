import Footer from "@/components/footer";
import { Nunito } from "next/font/google";
import Moods from "../components/moods";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full p-2 lg:p-6 mb-20 md:mb-24 max-w-4xl mx-auto text-white">
        <div className="navbar bg-base-300 rounded-box shadow-lg mb-4 md:mb-6 max-w-[40rem] mx-auto">
          <div className="navbar-start w-1/4">
            <a
              className="btn btn-square btn-ghost"
              aria-label="Go to homepage"
              href="/"
            >
              <svg
                width="38px"
                height="38px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#dc2626"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5L21 3V17M21 17C21 18.1046 19.6569 19 18 19C16.3431 19 15 18.1046 15 17C15 15.8954 16.3431 15 18 15C19.6569 15 21 15.8954 21 17ZM9 9L21 7"
                    stroke="#7f7ffe"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </a>
          </div>
          <div className="navbar-center w-1/2 justify-center">
            <div
              className={`text-center font-extrabold text-xl ${nunito.className}`}
            >
              Mood2Music
            </div>
          </div>
          <div className="navbar-end w-1/4"></div>
        </div>
        <div className="text-center">
          <h1
            className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${nunito.className}`}
          >
            Discover top-rated music based on your mood
          </h1>
          <div className="text-xl mb-4">How are you feeling now?</div>
          <Moods />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
