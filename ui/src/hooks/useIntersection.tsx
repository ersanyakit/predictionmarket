import React, { useEffect } from "react";

const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentRef?.style.setProperty("opacity", "1");
          currentRef?.style.setProperty("scale", "1");
        } else {
          currentRef?.style.setProperty("opacity", "0.01");
          currentRef?.style.setProperty("scale", "0.9");
        }
      },
      { threshold: 0.4 }
    );
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);
};

export default useIntersectionObserver;
