import { useEffect } from "react";
import "./scroll.css";
export default function Scroll() {
  useEffect(() => {
    const { animate, scroll } = window.Motion;

    const items = document.querySelectorAll(".img-container");

    // Animate gallery horizontally during vertical scroll
    scroll(
      animate(".img-group", {
        transform: ["none", `translateX(-${items.length - 1}00vw)`],
      }),
      { target: document.querySelector(".img-group-container") }
    );

    // Progress bar representing gallery scroll
    scroll(animate(".progress", { scaleX: [0, 1] }), {
      target: document.querySelector(".img-group-container"),
    });
  }, []);
  return (
    <article id="gallery">
      <header>
        <h2>Lines of London</h2>
      </header>
      <section className="img-group-container">
        <div>
          <ul className="img-group">
            {[1, 2, 3, 4, 5].map((id) => (
              <li key={id} className="img-container">
                <img
                  src={`/photos/cityscape/${id}.jpg`}
                  alt={`Cityscape ${id}`}
                />
                <h3>#{id.toString().padStart(3, "0")}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <footer>
        <p>
          Photos by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/mattgperry"
          >
            Matt Perry
          </a>
        </p>
      </footer>
      <div className="progress"></div>
    </article>
  );
}
