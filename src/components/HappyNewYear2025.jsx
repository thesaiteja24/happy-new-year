import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import useSound from "use-sound";

const HappyNewYear2025 = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [countdown, setCountdown] = useState("");
  const [isNewYear, setIsNewYear] = useState(false);
  const [play] = useSound("/festive-sound.mp3", { volume: 0.5 }); // Ensure file is in /public

  // Update window dimensions for Confetti
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Countdown to New Year
  useEffect(() => {
    const targetDate = new Date("January 1, 2025 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setIsNewYear(true);
        play(); // Trigger sound on countdown end
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [play]);

  // Debugging button for triggering sound manually
  const handlePlaySound = () => {
    play();
  };

  const shareUrl = "https://yourdomain.com/happynewyear2025"; // Update with your actual domain

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-700 flex flex-col items-center justify-center text-white p-6 relative">
      {/* Confetti Animation */}
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={isNewYear ? 400 : 0}
        recycle={isNewYear}
      />

      {/* Content */}
      <div className="text-center">
        {isNewYear ? (
          <>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-bounce">
              🎉 Happy New Year 2025 🎉
            </h1>
            <p className="text-lg md:text-2xl mt-4 mb-8 font-medium">
              "Cheers to a new year and another chance to make your dreams come
              true."
            </p>
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Just a Few More Moments to Go...
            </h1>
            <div className="text-4xl md:text-5xl font-semibold mb-6 text-yellow-300 animate-pulse">
              {countdown}
            </div>
          </>
        )}
      </div>

      {/* Social Media Share Buttons */}
      <div className={`flex gap-4 mt-8 `}>
        <FacebookShareButton
          url={shareUrl}
          quote="Happy New Year 2025! 🎉 Cheers to a new beginning!"
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title="Happy New Year 2025! 🎉 Cheers to a new beginning!"
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title="Happy New Year 2025! 🎉 Cheers to a new beginning!"
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
      </div>

      {/* Debugging Button */}
      {/* {!isNewYear && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          onClick={handlePlaySound}
        >
          Test Sound
        </button>
      )} */}

      <footer className="absolute bottom-4 text-sm md:text-base">
        <p>Made with ❤️ by Sai Teja</p>
      </footer>
    </div>
  );
};

export default HappyNewYear2025;
