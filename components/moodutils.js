// moodUtils.js

// Function to extract mood from the URL
export const extractMoodFromURL = () => {
  // Mapping moods to their respective emojis
  const moodMapping = {
    "cheerful": "😁 Cheerful",
    "reflective": "🤔 Reflective",
    "gloomy": "😕 Gloomy",
    "humorous": "🤣 Humorous",
    "melancholy": "😶 Melancholy",
    "idyllic": "🤩 Idyllic",
    "chill": "😎 Chill",
    "romantic": "🥰 Romantic",
    "weird": "🤨 Weird",
    "horny": "🤤 Horny",
    "sleepy": "🥱 Sleepy",
    "angry": "😡 Angry",
    "fearful": "😨 Fearful",
    "lonely": "😢 Lonely",
    "tense": "😬 Tense",
    "thoughtful": "🤓 Thoughtful",
    "thrill-seeking": "🤪 Thrill-seeking",
    "playful": "🙃 Playful",
  };
  
  const pathSegments = window.location.pathname.split("/");
  const moodIndex = pathSegments.indexOf("music") + 1;
  
  if (moodIndex > 0 && moodIndex < pathSegments.length) {
    const moodKey = decodeURIComponent(pathSegments[moodIndex]).toLowerCase();
    const mappedMood = moodMapping[moodKey];
    return mappedMood || moodKey; // Fallback to the raw key if mapping is not found
  }
  return null;
}  

// Function to fetch mood details
export const fetchMoodDetails = async (moodName, setPlaylist, setLoading) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood: moodName }), // Sending only the mood part
    });
    if (!response.ok) {
      throw new Error("Network response was not ok at all");
    }
    const data = await response.json(); // Parse the response as JSON
    const content = data.content; // Extract content
    const jsonString = content.replace(/\\n/g, "").trim(); // Clean the JSON string
    const jsonObject = JSON.parse(jsonString); // Parse the cleaned JSON string

    const extractedPlaylist = [];
    for (let i = 0; i < jsonObject.length; i++) {
      const songEntry = jsonObject[i];
      const song = songEntry[(i + 1).toString()]; // Access the song details
      const parts = song.youtubelink.split("/embed/");
      const videoId = parts[1]; // This assumes there is no additional path after the video ID

      extractedPlaylist.push({
        title: song.title,
        description: song.description, // Assuming the artist is stored in description
        link: videoId,
      });
    }
    setPlaylist(extractedPlaylist); // Set the playlist from extracted data
    setLoading(false); // Set loading to false once data is fetched
  } catch (error) {
    console.error("Failed to fetch playlist:", error);
    setLoading(false);
  }
};
