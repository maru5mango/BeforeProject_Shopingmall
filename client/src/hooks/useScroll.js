import { useState, useEffect } from "react";

function toFit(cb) {
  if (!cb) {
    throw Error("Invalid required arguments");
  }

  const dismissCondition = () => false;
  const triggerCondition = () => true;

  let tick = false;

  return function () {
    if (tick) {
      return;
    }

    tick = true;
    return requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false;
        return;
      }

      if (triggerCondition()) {
        tick = false;
        return cb();
      }
    });
  };
}

const useScroll = () => {
  const [y, setY] = useState(0);

  const onScroll = () => {
    setY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", toFit(onScroll), {
      capture: false,
      passive: true,
    });
    window.addEventListener("load", onScroll, {
      capture: false,
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", toFit(onScroll));
      window.removeEventListener("load", onScroll);
    };
  }, []);
  return y;
};

export default useScroll;
