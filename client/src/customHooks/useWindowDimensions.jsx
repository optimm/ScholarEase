import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { clientWidth: width, clientHeight: height } = document.body;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions(id = "none") {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
  }, []);

  // setWindowDimensions(getWindowDimensions());
  return windowDimensions;
}
