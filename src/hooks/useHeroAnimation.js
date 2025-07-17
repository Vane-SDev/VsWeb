import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useHeroAnimation = (mainRef, setServicesLinkId) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".animation-container", { perspective: 1000 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".animation-container",
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(".hero-container", {
        opacity: 0.3,
        rotateY: -90,
        filter: "blur(10px)",
        transformOrigin: "left center",
        ease: "power2.inOut",
      });

      tl.fromTo(
        ".services-section",
        {
          opacity: 0,
          xPercent: 100,
        },
        {
          opacity: 1,
          xPercent: 0,
          ease: "power2.out",
        },
        "-=0.2"
      );

      tl.fromTo(
        ".services-container > *",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          ease: "power3.out",
        },
        "-=0.15"
      );

      ScrollTrigger.create({
        trigger: ".animation-container",
        start: "top top",
        end: "bottom top",
        onEnter: () => setServicesLinkId("services"),
        onLeaveBack: () => setServicesLinkId("servicios"),
      });
    }, mainRef);

    return () => ctx.revert();
  }, [mainRef, setServicesLinkId]);
};
