import { useState, useEffect, useRef } from "react";

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // We want to show the button only when the user has scrolled past the hero form
    // The hero form is at the top, so we can check if scrollY > some threshold (e.g., 600px)
    // Or we can use an Intersection Observer on the hero section.
    
    const handleScroll = () => {
      // Threshold for showing the button - usually after the hero section
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-6 left-0 right-0 z-40 px-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <a
        href="#waitlist-bottom"
        className="flex items-center justify-center w-full h-14 bg-primary text-primary-foreground font-bold rounded-xl shadow-xl shadow-primary/20 active:scale-95 transition-all"
      >
        Claim my spot
      </a>
    </div>
  );
};

export default StickyCTA;
