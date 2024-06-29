// pages/api/chat.js
import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extract the mood from the request body
    const { mood } = req.body;

    // Initialize the OpenAI client with your API key
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
    });

    try {
      // Make a request to the OpenAI Chat Completions API
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4-with-browser",
        messages: [
          {
            role: "system",
            content: `Generate a list of 10 diverse songs from YouTube that encapsulate the mood of ${mood}. Each entry should include a title, a brief explanation of why the song fits the mood, and a YouTube URL formatted for embedding. Ensure the songs vary in genre and popularity, including both well-known hits and obscure gems. Use only videos that are confirmed to be embeddable and publicly accessible. Source the songs from a diverse range of YouTube channels and utilize advanced search filters to select recent, highly-rated, and embeddable videos. Provide the details in a JSON format, with each entry clearly numbered and structured for easy integration into a database or application. Confirm that all provided YouTube links are available for embedding to avoid playback issues. Here is the required format:

            [
              {
                "1": {
                  "title": "Song Title",
                  "description": "This song captures the mood of ${mood} because...",
                  "youtubelink": "https://www.youtube.com/embed/{videoId}"
                }
              },
              {
                "2": {
                  "title": "Song Title",
                  "description": "This song fits the mood due to its...",
                  "youtubelink": "https://www.youtube.com/embed/{videoId}"
                }
              },
              {
                "3": {
                  "title": "Song Title",
                  "description": "The lyrical content and melody align well with ${mood} because...",
                  "youtubelink": "https://www.youtube.com/embed/{videoId}"
                }
              },
              // Continue the pattern for the remaining songs
            ]`,
          },
        ],
      });

      // Send the OpenAI API response back to the client
      res.status(200).send(chatCompletion.choices[0].message);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      res.status(500).json({ message: "Error processing your request" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
