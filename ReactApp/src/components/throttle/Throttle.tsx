import React, { useEffect } from "react";

function Throttle() {
  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll position:", window.scrollY);
    };

    let lastCall = 0;
    const throttledScroll = () => {
      const now = Date.now();
      if (now - lastCall >= 200) { // Run every 200ms
        handleScroll();
        lastCall = now;
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return <div style={{ height: "2000px" }}>Scroll down!</div>;
}

export default Throttle;