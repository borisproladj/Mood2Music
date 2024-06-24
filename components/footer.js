export default function Footer() {
  return (
    <div className="flex flex-row justify-center items-center text-center gap-1 mt-6">
      <div>
        Made with 🎵 by &nbsp;
        <a
          href="https://borisladj.vercel.app"
          className="link link-primary"
          target="_blank"
        >
          Boris
        </a>
      </div>
      <div className="avatar">
        <div className="relative w-8 rounded-full">
          <div className="block overflow-hidden bg-transparent opacity-100 border-0 m-0 p-0 absolute top-0 left-0 bottom-0 right-0">
            <img src="/profile.jpeg" alt="Boris Ladyjensky"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
