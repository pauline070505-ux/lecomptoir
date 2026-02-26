import { useState, useEffect } from "react";

export const useCountdown = (endsAt: string | null) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!endsAt) {
      setTimeLeft("--");
      return;
    }

    const calc = () => {
      const now = Date.now();
      const end = new Date(endsAt).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Terminé");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}j ${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`);
      } else {
        setTimeLeft(`${minutes}m ${String(seconds).padStart(2, "0")}s`);
      }
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  return timeLeft;
};
