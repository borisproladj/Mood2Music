"use client";
import { Nunito } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

export default function Moods() {
  const [selectedMood, setSelectedMood] = useState("");
  const router = useRouter(); // Use the useRouter hook here

  // Array with combined emoji and mood names
  const moods = [
    "😁 Cheerful",
    "🤔 Reflective",
    "😕 Gloomy",
    "🤣 Humorous",
    "😶 Melancholy",
    "🤩 Idyllic",
    "😎 Chill",
    "🥰 Romantic",
    "🤨 Weird",
    "🤤 Horny",
    "🥱 Sleepy",
    "😡 Angry",
    "😨 Fearful",
    "😢 Lonely",
    "😬 Tense",
    "🤓 Thoughtful",
    "🙃 Playful",
  ];

  // Function to handle mood button clicks
  const handleMoodClick = async (mood) => {
    setSelectedMood(mood);
    const moodName = mood.split(" ")[1]; // Extract the mood name
    router.push(`/music/${encodeURIComponent(moodName)}`); // Navigate to the new page
  };

  return (
    <div
      className={`grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 ${nunito.className}`}
    >
      {moods.map((mood) => (
        <button
          key={mood}
          className="btn md:btn-lg border-[1.5px] border-primary hover:btn-primary btn-outline text-white"
          onClick={() => handleMoodClick(mood)}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
