import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

    const animation = gsap.to(scrollContainer, {
      x: -scrollWidth, // Moves left
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    return () => {
      // ✅ Correct way to clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      animation.kill();
    };
  }, []);

  return (
    <div className="w-full">
      <section className="h-screen flex items-center justify-center bg-black text-white text-3xl">
        Scroll Down to See the Effect
      </section>

      <div
        ref={wrapperRef}
        className="relative overflow-hidden w-full h-screen"
      >
        <div
          ref={containerRef}
          className="flex space-x-6 w-[300vw] h-full items-center px-10"
        >
          <img
            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
            alt="Image 1"
            className="w-[80vw] h-[80vh] object-cover rounded-lg shadow-lg"
          />
          <img
            src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
            alt="Image 2"
            className="w-[80vw] h-[80vh] object-cover rounded-lg shadow-lg"
          />
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg"
            alt="Image 3"
            className="w-[80vw] h-[80vh] object-cover rounded-lg shadow-lg"
          />
          <img
            src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg"
            alt="Image 3"
            className="w-[80vw] h-[80vh] object-cover rounded-lg shadow-lg"
          />
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
            alt="Image 3"
            className="w-[80vw] h-[80vh] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <section className="h-screen flex items-center justify-center bg-black text-white text-3xl">
        End of Horizontal Scroll
      </section>
    </div>
  );
};

export default HorizontalScroll;
