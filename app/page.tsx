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
            <div className="mt-5 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-lg p-5 text-center break-words w-full max-w-5xl mx-auto">
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
          <div className="mx-auto max-w-5xl">
            Speedrunning is the art of completing a video game as quickly as
            possible, often using optimized strategies, glitches, and
            exceptional skill to achieve record-breaking times. Speedrunning
            isn’t just about rushing through a game; it’s a challenge against
            the clock, the game, and even the boundaries of what’s thought
            possible. It’s about deep mastery, creative problem-solving, and
            innovation, all within the context of beloved video games.
          </div>
          <figure className="flex flex-col items-center m-9 ">
            <div
              className="relative w-full max-w-[800px] h-auto"
              style={{
                aspectRatio: "16 / 10",
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
              Speedrunning takes practice, precision, and passion.
            </figcaption>
          </figure>

          <p className="max-w-5xl mx-auto">
            In today’s world, speedrunning thrives on streaming platforms like{" "}
            <a
              href="https://www.twitch.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              Twitch
            </a>{" "}
            or events like{" "}
            <a
              href="https://gamesdonequick.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              Games Done Quick
            </a>
            . These events raise millions for charity while showcasing
            incredible gaming feats. Speedrunning has evolved from playing on
            original consoles or PCs to using emulators that enable retro gaming
            on modern systems. While this expands accessibility, strict rules
            ensure fair competition.
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
                  aspectRatio: "16 / 10",
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
                speedrun.com, the ultimate hub for the speedrunning community.
              </figcaption>
            </a>
          </figure>

          <div className="mx-auto mt-2 max-w-5xl">
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
            API to uncover the amazing feats of speedrunners.
            <div className="mt-5 border border-yellow-300 text-yellow-700 rounded-lg p-5 text-center break-words w-full max-w-5xl mx-auto">
              <strong>Data disclaimer:</strong> This analysis focuses on the top
              50 games with the most submissions, only considering verified runs
              for full-game categories. Unfortunately, the dataset only goes up
              to November 2023. While it misses speedrunning’s earlier history,
              it highlights key trends from recent years. I plan to scrape and
              update the data myself in the future!
            </div>
          </div>
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-11 mb-10`}
          >
            UNDERSTANDING SPEEDRUNNING
          </div>
          <p className="max-w-5xl mx-auto"> Blableblbl</p>
          <div className="mx-auto w-full mt-5">
            <Fig0bis />
          </div>
          <p className="max-w-5xl mx-auto">
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
          <div className="mx-auto w-full mt-5">
            <Fig0 />
          </div>
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-11 mb-10`}
          >
            THE MOST SPEEDRUNNED GAMES
          </div>
          <p className="mx-auto max-w-5xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
          <div className="mx-auto w-full mt-5 mb-5">
            <Fig05 />
          </div>
          <p className="mx-auto max-w-5xl">
            Now you can explore the data by yourself!
          </p>
          <div className="mx-auto  w-full mt-5 mb-5">{stableFig1}</div>
          <div
            className={`${styles.chrome} ${styles.titleDecorated} mt-9 mb-9`}
          >
            GAMES COMMUNITIES
          </div>
          <p className="mx-auto max-w-5xl">Test test test</p>
          <div className="mx-auto w-full mt-5 mb-5">
            <Fig2 />
          </div>
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-9 mb-9`}
          >
            EVOLUTION OF GAME POPULARITY
          </div>
          <p className="mx-auto max-w-5xl">Test test test</p>

          <div className="mx-auto w-full mt-5 mb-5">
            <Fig3 />
          </div>
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-9 mb-9`}
          >
            MOST COMPETITIVE COUNTRIES
          </div>
          <p className="mx-auto max-w-5xl">Test test test</p>

          <div className="mx-auto w-full mt-5 mb-5">
            <Fig4 />
          </div>
          <div
            className={`${styles.chrome}  ${styles.titleDecorated} mt-9 mb-9`}
          >
            ABOUT THIS WORK
          </div>

          <div className="mt-9 bg-gray-100 border border-gray-300 rounded-lg p-5 flex max-w-2xl mx-auto w-full">
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
          <div className="mt-9 mb-9 bg-gray-200 border border-gray-300 rounded-lg p-5 max-w-2xl mx-auto w-full">
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
