// SongList.js
import { useState, useEffect } from "react";
import Footer from "./footer";
import { extractMoodFromURL, fetchMoodDetails } from "./moodUtils"; // Adjust path as necessary

export default function SongList() {
  const [mood, setMood] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // State to manage current card index

  useEffect(() => {
    const extractedMood = extractMoodFromURL();
    if (extractedMood) {
      setMood(extractedMood);
      fetchMoodDetails(extractedMood, setPlaylist, setLoading);
    }
  }, []);

  const handleNext = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleHide = () => {
    setPlaylist((prevPlaylist) => {
      const newPlaylist = prevPlaylist.filter(
        (_, index) => index !== currentIndex
      );
      if (currentIndex >= newPlaylist.length) {
        setCurrentIndex(newPlaylist.length - 1); // Adjust current index if necessary
      }
      return newPlaylist;
    });
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center mt-60">
          We're fetching the best songs for when you feel {mood}
        </div>
        <div className="flex justify-center items-center my-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            width="100px"
            height="100px"
          >
            <circle
              transform="rotate(0)"
              transform-origin="center"
              fill="none"
              stroke="#7f7ffe"
              stroke-width="15"
              stroke-linecap="round"
              stroke-dasharray="230 1000"
              stroke-dashoffset="0"
              cx="100"
              cy="100"
              r="70"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="2"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
          </svg>
        </div>
      </>
    ); // Show loading while data is being fetched
  }

  if (!playlist.length) {
    return <p>No songs found for {mood}</p>;
  }

  const currentSong = playlist[currentIndex];

  return (
      <div className="card card-compact md:card-normal w-full md:w-[40rem] bg-base-300 shadow-xl mx-auto">
        <figure>
          <div className="video-responsive w-full">
            <iframe
              src={`https://www.youtube.com/embed/${currentSong.link}`}
              title={currentSong.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 md:h-96"
            ></iframe>
          </div>
        </figure>
        <div className="card-body">
          <div className="card-title tracking-tight nunito">{currentSong.title}</div>
          <h2 className="h-16 opacity-75 md:h-20 overflow-auto text-sm">
            {currentSong.description}
          </h2>
          <div className="card-actions justify-between ">
            <button
              className="btn btn-primary text-white"
              onClick={handleBack}
              disabled={currentIndex === 0}
            >
              ⬅️ Back
            </button>
            <button className="btn btn-primary text-white" onClick={handleHide}>
              Hide 🙈
            </button>
            <button
              className="btn btn-primary text-white"
              onClick={handleNext}
              disabled={currentIndex === playlist.length - 1}
            >
              Next ➡️
            </button>
          </div>
        </div>
      </div>
  );
}
