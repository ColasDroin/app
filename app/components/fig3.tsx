"use client";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
  MouseEvent,
} from "react";
import ReactECharts from "echarts-for-react";
import pako from "pako";
import Portal from "./Portal";

// 1) Our five featured games (in reveal order):
const featuredGames = [
  {
    name: "Super Mario 64",
    desc: "The most popular game for speedrunning, since the beginning",
  },
  {
    name: "Super Mario Odyssey",
    desc: "Came out in 2017, the spiritual successor of SM64, which robbed first place for a couple months",
  },
  {
    name: "Resident Evil 2 (2019)",
    desc: "A modern remake that revived the classic survival horror speedruns.",
  },
  {
    name: "Minecraft: Java Edition",
    desc: "The ultimate sandbox phenomenon, popular across various speedrun categories.",
  },
  {
    name: "Seterra (Old Version)",
    desc: "A geography quiz game with surprising speedrun potential.",
  },

  {
    name: "And many others...",
    desc: "",
  },
];

const CENTER_TOLERANCE = 50;
const DEBOUNCE_INTERVAL = 1000;
const STARTING_REVEALED = 1;
const FINAL_GRACE_PERIOD = 1000; // ms

const Page: React.FC = () => {
  const chartRef = useRef<ReactECharts | null>(null);
  const [option, setOption] = useState<echarts.EChartsOption | null>(null);

  // Data from the server:
  const [allGames, setAllGames] = useState<string[]>([]);
  const [riverData, setRiverData] = useState<any[]>([]);

  // Scroll-based reveal
  const [revealedCount, setRevealedCount] = useState(STARTING_REVEALED);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [completed, setCompleted] = useState(false);

  // For expansions/folding
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [appeared, setAppeared] = useState<boolean[]>([]);

  // For final folding
  const [hasFoldedLast, setHasFoldedLast] = useState(false);
  const [timeLastReveal, setTimeLastReveal] = useState<number | null>(null);

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const lastRevealRef = useRef<number>(0);

  // Tooltip states (for the side panel titles)
  const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);
  const [hoverCoords, setHoverCoords] = useState({ x: 0, y: 0 });

  // Touch tracking
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  let isSmallScreen = false;
  if (typeof window !== "undefined") {
    isSmallScreen = window.innerWidth < 768;
  } else {
    console.error("Window object is not available.");
  }
  const fontSize = isSmallScreen ? 12 : 18;

  /****************************************************
   * Reveal logic (shared by wheel and touch)
   ****************************************************/
  const triggerReveal = useCallback(() => {
    const totalFeatured = featuredGames.length - 1;

    // If we've revealed all featured plus "others"
    // i.e. revealedCount > totalFeatured => last stage
    if (revealedCount > totalFeatured) {
      // Wait for grace period to fold last
      if (!hasFoldedLast) {
        const now = Date.now();
        if (!timeLastReveal) {
          setTimeLastReveal(now);
          return;
        }
        if (now - timeLastReveal < FINAL_GRACE_PERIOD) {
          return;
        }
        // fold
        setHasFoldedLast(true);
        setExpandedIndex(-1); // or no expanded
        return;
      } else {
        // finalize
        setCompleted(true);
        setScrollLocked(false);
        document.body.style.overflow = "auto";
        return;
      }
    }

    // Otherwise, normal partial reveal
    const now = Date.now();
    if (now - lastRevealRef.current >= DEBOUNCE_INTERVAL) {
      lastRevealRef.current = now;
      setRevealedCount((prev) => {
        const newVal = prev + 1;
        // Expand the newly revealed item
        if (newVal <= totalFeatured) {
          setExpandedIndex(newVal - 1);
        } else {
          // newVal == totalFeatured+1 => all others
          setTimeLastReveal(Date.now());
        }
        return newVal;
      });
    }
  }, [
    revealedCount,
    hasFoldedLast,
    timeLastReveal,
    setTimeLastReveal,
    setHasFoldedLast,
  ]);

  /****************************************************
   * 1) Wheel Handler (desktop)
   ****************************************************/
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (completed) return;
      if (!chartContainerRef.current) return;

      // We only want to trigger if user scrolls upward => e.deltaY > 0
      if (e.deltaY <= 0) {
        // deltaY negative => user is scrolling down, do nothing
        return;
      }

      const rect = chartContainerRef.current.getBoundingClientRect();
      const chartCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = Math.abs(chartCenter - viewportCenter);

      // if not locked
      if (!scrollLocked) {
        if (distance < CENTER_TOLERANCE) {
          setScrollLocked(true);
          document.body.style.overflow = "hidden";
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }

      if (scrollLocked) {
        e.preventDefault();
        e.stopPropagation();
        triggerReveal();
      }
    },
    [scrollLocked, completed, triggerReveal]
  );

  /****************************************************
   * 2) Touch Handlers (mobile)
   ****************************************************/
  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (completed) return;
      if (!chartContainerRef.current) return;
      if (touchStartY === null) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      // We only trigger if user swipes upward => deltaY > 0
      if (deltaY <= 0) {
        // user is swiping downward or not moving enough, do nothing
        return;
      }

      const rect = chartContainerRef.current.getBoundingClientRect();
      const chartCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = Math.abs(chartCenter - viewportCenter);

      if (!scrollLocked) {
        if (distance < CENTER_TOLERANCE) {
          setScrollLocked(true);
          document.body.style.overflow = "hidden";
          // We MUST preventDefault if we do not want the page to bounce/scroll
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }

      if (scrollLocked) {
        e.preventDefault();
        e.stopPropagation();
        triggerReveal();
      }
    },
    [completed, chartContainerRef, scrollLocked, triggerReveal, touchStartY]
  );

  /****************************************************
   * 3) Attach/detach scroll/touch listeners
   ****************************************************/
  useLayoutEffect(() => {
    // Wheel for desktop
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Touch for mobile
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  /****************************************************
   * 4) Fetch popularity_data.json.gz (your existing code)
   ****************************************************/
  const prepareGraph = useCallback(async () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}`;
    try {
      const response = await fetch(`${baseUrl}/data/popularity_data.json.gz`);
      const buffer = await response.arrayBuffer();
      const decompressed = pako.inflate(new Uint8Array(buffer), {
        to: "string",
      });
      const popularityData = JSON.parse(decompressed);

      setAllGames(popularityData.games || []);
      setRiverData(popularityData.data || []);
    } catch (error) {
      console.error("Error fetching scatter data:", error);
    }
  }, []);

  useEffect(() => {
    prepareGraph();
  }, [prepareGraph]);

  /****************************************************
   * 5) Build the "selected" object for partial reveal
   ****************************************************/
  const buildSelectedObject = useCallback(() => {
    // We have 5 featured items. If revealedCount=1 => show first only
    // If revealedCount=5 => show all five
    // If revealedCount=6 => show everything else too
    const selected: Record<string, boolean> = {};
    for (const g of allGames) {
      selected[g] = false;
    }

    const totalFeatured = featuredGames.length - 1;

    if (revealedCount <= totalFeatured) {
      // only reveal first `revealedCount` from featured
      for (let i = 0; i < revealedCount; i++) {
        const gameName = featuredGames[i].name;
        selected[gameName] = true;
      }
    } else {
      // revealedCount > 5 => all
      for (const g of allGames) {
        selected[g] = true;
      }
    }
    return selected;
  }, [allGames, revealedCount]);

  /****************************************************
   * 6) Rebuild ECharts Option whenever data changes
   ****************************************************/
  useEffect(() => {
    if (!allGames.length || !riverData.length) return;

    const selectedMap = buildSelectedObject();

    const newOption: echarts.EChartsOption = {
      title: {
        text: "Mensual run submissions per game",
        left: "center",
        textStyle: { color: "#CBE4DE", fontSize: fontSize },
      },
      backgroundColor: "transparent",
      animation: "auto",
      animationDuration: 1000,
      animationDurationUpdate: 500,
      animationEasing: "cubicInOut",
      animationEasingUpdate: "cubicInOut",
      animationThreshold: 20000,
      progressiveThreshold: 30000,
      progressive: 400,
      hoverLayerThreshold: 30000,
      stateAnimation: {
        duration: 300,
        easing: "cubicOut",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            color: "rgba(0,0,0,0.2)",
            width: 1,
            type: "solid",
          },
          label: {
            show: false,
            // formatter: "{value|YYYY-MM (submissions/month)} ",
          },
        },
        position: function (point, params, dom, rect, size) {
          const chartWidth = size.viewSize[0];
          const chartHeight = size.viewSize[1];
          const tooltipHeight = size.contentSize[1];
          let x =
            point[0] < chartWidth / 3
              ? chartWidth - size.contentSize[0] - 10
              : 10;
          let y = point[1] - 200;

          // Ensure tooltip does not go below the lower limit of the graph
          if (y + tooltipHeight > chartHeight) {
            y = chartHeight - tooltipHeight - 10;
          }

          // Ensure tooltip does not go above the upper limit of the graph
          if (y < 0) {
            y = 10;
          }

          return [x, y];
        },
      },
      legend: [
        {
          data: allGames,
          selected: selectedMap,
          top: 30,
          right: 30,
          left: 0,
        },
      ],
      singleAxis: {
        top: "20%",
        bottom: "1%",
        axisTick: {
          interval: 1, // Add ticks every month
        },
        axisLabel: {
          formatter: (value: string) =>
            new Date(value).toISOString().slice(0, 7),
        },
        type: "time",
        axisPointer: {
          animation: true,
          label: {
            show: true,
            formatter: (params: any) =>
              new Date(params.value).toISOString().slice(0, 7),
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            opacity: 0.5,
          },
        },
      },
      series: [
        {
          type: "themeRiver",
          data: riverData,
          emphasis: {
            focus: "series",
            itemStyle: {
              shadowBlur: 20,
              shadowColor: "rgba(0, 0, 0, 0.8)",
            },
            label: {
              show: false, // Hide series labels
            },
          },
          label: {
            show: false, // Hide series labels
          },
        },
      ],
    };

    setOption(newOption);
  }, [allGames, riverData, revealedCount, buildSelectedObject]);

  /****************************************************
   * 7) Watch revealedCount => animate the side panel
   ****************************************************/
  useEffect(() => {
    // Step 1: Add the item to the DOM, but don’t apply `.appeared` yet.
    setAppeared((prev) => {
      const newArr = [...prev];
      newArr[revealedCount - 1] = false; // Explicitly set as "not appeared"
      return newArr;
    });

    // Step 2: Apply `.appeared` in the next render (or after a short delay)
    const timer = setTimeout(() => {
      setAppeared((prev) => {
        const newArr = [...prev];
        newArr[revealedCount - 1] = true; // Trigger the transition
        return newArr;
      });
    }, 50); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [revealedCount]);

  /****************************************************
   * 8) Tooltip events for side panel
   ****************************************************/
  const onTitleMouseEnter = (e: MouseEvent<HTMLDivElement>, index: number) => {
    setHoveringIndex(index);
    setHoverCoords({ x: e.clientX + 10, y: e.clientY + 10 });
  };
  const onTitleMouseLeave = () => {
    setHoveringIndex(null);
  };
  const onTitleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setHoverCoords({ x: e.clientX + 10, y: e.clientY + 10 });
  };

  /****************************************************
   * Render
   ****************************************************/
  return (
    <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto" }}>
      {/* LEFT: Chart container */}

      <div
        ref={chartContainerRef}
        style={{
          flex: "3",
          aspectRatio: "1.2 / 1",
          marginLeft: "1rem",
        }}
      >
        <ReactECharts
          ref={chartRef}
          option={option || {}}
          style={{
            width: "100%",
            height: isSmallScreen ? "400px" : "600px",
          }}
          opts={{ renderer: "canvas" }}
          theme="dark"
        />
      </div>

      {/* RIGHT: side panel */}
      <div
        style={{
          flex: "1",
          padding: "0.2rem",
          position: "relative",
          overflow: "visible",
        }}
      >
        {featuredGames.slice(0, revealedCount).map((g, idx) => {
          const hasAppeared = appeared[idx] || false; // Controls fade-in
          const isExpanded = idx === expandedIndex; // Controls description expand/fold

          return (
            <div
              key={g.name}
              className={`game-wrapper ${hasAppeared ? "appeared" : ""}`}
              style={{
                marginBottom: "1rem",
                fontSize: isSmallScreen ? "0.8rem" : "0.8rem",
              }}
            >
              {/* Title + tooltip if folded */}
              <div
                className="game-tooltip"
                style={{
                  fontWeight: "bold",
                  marginTop: isSmallScreen ? "0.2rem" : "3rem",
                }}
                onMouseEnter={(e) => onTitleMouseEnter(e, idx)}
                onMouseLeave={onTitleMouseLeave}
                onMouseMove={onTitleMouseMove}
              >
                {g.name}
                {!isExpanded && <div className="tooltip-text">{g.desc}</div>}
              </div>

              {/* Folding container */}
              <div className={`game-container ${isExpanded ? "expanded" : ""}`}>
                {isExpanded && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: isSmallScreen ? "0.7rem" : "1.1rem",
                    }}
                  >
                    {g.desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* OPTIONAL: Portal-based floating tooltip (pointer-follow style) */}
      <Portal>
        {hoveringIndex !== null && (
          <div
            style={{
              position: "fixed",
              top: hoverCoords.y,
              left: hoverCoords.x,
              zIndex: 999999,
              backgroundColor: "#000",
              color: "#fff",
              padding: "8px",
              borderRadius: "4px",
              pointerEvents: "none",
              maxWidth: "240px",
            }}
          >
            {featuredGames[hoveringIndex].desc}
          </div>
        )}
      </Portal>
    </div>
  );
};

export default Page;
