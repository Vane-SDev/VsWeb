import { useEffect, useRef } from "react";

const messages = [
  "¡No te vayas! 👀",
  "¿Necesitas presencia online?",
  "¡Volvé!",
  "✨ Tu web te espera ✨",
  "¿Todavía usas tablas en excel?",
  "VS Web Design",
];

export const useTabTitleMessaging = () => {
  const originalTitleRef = useRef(document.title);

  useEffect(() => {
    let intervalId = null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        let messageIndex = 0;
        intervalId = setInterval(() => {
          document.title = messages[messageIndex];
          messageIndex = (messageIndex + 1) % messages.length;
        }, 1500);
      } else {
        clearInterval(intervalId);
        document.title = originalTitleRef.current;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};
