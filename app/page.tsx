"use client";
import { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faMastodon,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Banner from "./components/banner";
import Fig0 from "./components/fig0";
import Fig0bis from "./components/fig0bis";
import Fig05 from "./components/fig05";
import Fig1 from "./components/fig1";
import Fig2 from "./components/fig2";
import Fig3 from "./components/fig3";
import Fig4 from "./components/fig4";
import styles from "./styles/banner.module.css";
import Image from "next/image";

export default function Home() {
  const [showSafariDisclaimer, setShowSafariDisclaimer] = useState(false);

  function isSafari() {
    if (typeof navigator === "undefined") return false; // SSR safety
    const ua = navigator.userAgent.toLowerCase();
    return ua.includes("safari") && !ua.includes("chrome");
  }
  const safari = isSafari();
  useEffect(() => {
    if (safari) {
      setShowSafariDisclaimer(true);
    }
  }, []);

  const stableFig1 = useMemo(() => <Fig1 />, []);

  return (
    <div>
      <div className="lg:h-[25vh] md:h-[20vw] sm:h-[18vh]">
        <Banner />
      </div>

      <div className="container mx-auto px-4 overflow-x-hidden">
        <div className="grid mx-auto px-4 sm:px-6 lg:px-8 mt-9">
          {showSafariDisclaimer && (
            <div className="mt-5 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-lg p-5 text-center break-words w-full">
              <strong>Performance Notice:</strong> You are using Safari. For the
              best experience, we recommend using a Chromium-based browser
              (Chrome, Edge, etc.) or Firefox.
            </div>
          )}
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-11 mb-5`}
          >
            INTRODUCTION
          </div>
          <div className="mx-auto ">
            Speedrunning is the art of completing a video game as quickly as
            possible, often using optimized strategies, glitches, and
            exceptional skill to achieve record-breaking times. But speedrunning
            is more than just rushing a game: it’s a battle against the clock,
            against the game, and sometimes, against the limits of what was
            thought possible. It’s about taking a game you love, learning its
            every nuance, and pushing it to its absolute breaking point.
          </div>
          <figure className="flex flex-col items-center m-9">
            <div
              className="relative w-full max-w-[800px] h-auto"
              style={{
                aspectRatio: "16 / 10", // Adjust as per your image's aspect ratio
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH_ASSETS}/images/speedrun_mario.gif`}
                alt="Speedrun Mario"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-lg shadow-md"
                priority
              />
            </div>
            <figcaption className="mt-2 text-center text-sm ">
              The kind of skill it takes to be a speedrunner.
            </figcaption>
          </figure>

          <p>
            Nowadays, runs are often shared on streaming platforms like Twitch
            or in charity events like <i>Games Done Quick</i>. Speedrunning has
            been around pretty much since the beginning of video games, and
            while a lot of people keep running games on original consoles or PC,
            some also use emulators, which let you play games from older systems
            on newer hardware. This opens up more possibilities, but there are
            rules to make sure it’s still a fair competition.
          </p>

          <figure className="flex flex-col items-center m-9">
            <a
              href="https://www.speedrun.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div
                className="relative w-full max-w-[500px] max-h-[100px] h-auto"
                style={{
                  aspectRatio: "16 / 10", // Adjust as per your image's aspect ratio
                }}
              >
                {" "}
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH_ASSETS}/images/speedrun_com.png`}
                  alt="Speedrun.com"
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg shadow-md"
                  priority
                />
              </div>

              <figcaption className="mt-0 text-center text-sm ">
                speedrun.com, where all the magic happens nowadays.
              </figcaption>
            </a>
          </figure>

          <div className="mx-auto mt-2">
            Let&apos;s analyze some data gathered from the{" "}
            <span className={`${styles.subtleGlow}`}>
              <a
                href="https://www.speedrun.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                speedrun.com
              </a>
            </span>{" "}
            API to better understand the amazing feats of speedrunners. A WORD
            ABOUT THE DATA Since the number of submitted runs easily exceed the
            4M mark, I decided to mainly focus only on the top 50 games with the
            most submissions, only keeping verified runs for full-game
            categories (per-level categories are not considered). Also, the data
            only goes back to 2012, and speedrunning is a practice that has been
            around for much longer... but we have to start somewhere, and
            speedrun.com is nowadays considered the main hub for speedrunning.
          </div>
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-11 mb-10`}
          >
            UNDERSTANDING SPEEDRUNNING
          </div>
          <div className="mx-auto">
            <Fig0bis />
          </div>
          <p>
            Speedrunning has tons of categories, so it’s not always easy to
            follow everything. There’s the popular "Any%" category, where you do
            whatever it takes to finish fast, and "100%" where you aim to do
            everything in the game. Some speedruns are even broken down by
            level, where players focus on beating individual stages as fast as
            they can. With all these different categories, there's something for
            every kind of speedrunner, and it keeps the community fresh and
            competitive. The figure belows illustrate the main categories and
            their rules for for the top 10 games with the most submissions.
          </p>
          <div className="mx-auto">
            <Fig0 />
          </div>
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-11 mb-10`}
          >
            THE MOST SPEEDRUNNED GAMES
          </div>
          <div className="mx-auto">
            <Fig05 />
          </div>
          <div className="mx-auto">{stableFig1}</div>
          <div
            className={`${styles.chrome} ${styles.titleDecorated} mt-11 mb-10`}
          >
            GAMES COMMUNITIES
          </div>
          <div className="mx-auto">
            <Fig2 />
          </div>
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-11 mb-10`}
          >
            EVOLUTION OF GAME POPULARITY
          </div>
          <div className="mx-auto">
            <Fig3 />
          </div>
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-11 mb-10`}
          >
            MOST COMPETITIVE COUNTRIES
          </div>
          <div className="mx-auto">
            <Fig4 />
          </div>
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-11 mb-10`}
          >
            ABOUT THIS WORK
          </div>
          <div className="mt-15 bg-gray-100 border border-gray-300 rounded-lg p-5 flex">
            <div className="flex-shrink-0 mr-5">
              <img
                src="images/my_photo.jpg"
                alt="Picture of Colas"
                className="w-36 h-36 rounded-full border border-gray-300 object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Hi there, I'm Colas!</h2>
              <p className="mt-2 text-gray-700">
                I'm currently transitioning from academia in the hope of living
                from my data visualization work. This is my first project, and
                I'm thrilled to share it with you! Your support means the world
                to me, whether it's by buying me a coffee, sharing my work on
                social media, or simply spreading the word.
              </p>
              <div className="mt-4">
                <a
                  href="https://buymeacoffee.com/colasdroin"
                  target="_blank"
                  className="bg-yellow-400 text-black py-2 px-4 rounded-md font-semibold"
                >
                  Buy Me a Coffee
                </a>
              </div>
              <div className="flex space-x-3 mt-4">
                <a
                  href="https://twitter.com/intent/tweet?text=Check+out+Colas%27+amazing+data+viz+work!&url=https://colasdroin.github.io/speedrunning_visual_exploration/"
                  target="_blank"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a
                  href="https://mastodon.social/share?text=Check+out+Colas%27+amazing+data+viz+work!&url=https://colasdroin.github.io/speedrunning_visual_exploration/"
                  target="_blank"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faMastodon} size="lg" />
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://colasdroin.github.io/speedrunning_visual_exploration/"
                  target="_blank"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
                <a
                  href="https://www.linkedin.com/shareArticle?mini=true&url=https://colasdroin.github.io/speedrunning_visual_exploration/&title=Check+out+Colas%27+data+visualization+work!"
                  target="_blank"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </div>
              <div className="mt-4">
                <a
                  href="https://www.linkedin.com/in/colas-droin/"
                  target="_blank"
                  className="text-blue-600 font-semibold"
                >
                  Connect with me on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 bg-gray-200 border border-gray-300 rounded-lg p-5">
            <p className="text-sm text-gray-600">
              <strong>Disclaimer:</strong> All trademarks, logos, and images
              displayed on this website are the property of their respective
              owners. They are used here for informational purposes and to
              facilitate a better experience for visitors. This website is not
              affiliated with, endorsed, sponsored, or specifically approved by
              any video game company or its licensors. All data, including
              images, has been sourced from the public API of{" "}
              <a
                href="https://www.speedrun.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                speedrun.com
              </a>
              . If you are a copyright or trademark owner and believe your
              material has been used in an unauthorized way, please contact me
              immediately and and I will address the issue promptly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
