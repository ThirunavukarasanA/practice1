import React, { useState, useEffect, useRef } from "react";

const TextEditor = () => {
  const [content, setContent] = useState("");
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    visible: false,
  });
  const textareaRef = useRef(null);
  const menuRef = useRef(null);

  // Load content from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("editorContent", content);
  }, [content]);

  const handleMouseUp = () => {
    const textarea = textareaRef.current;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    if (selectionStart !== selectionEnd) {
      const { top, left, height } = textarea.getBoundingClientRect();
      const lineHeight = 20; // Approximate height of a line
      const menuTop = top + height + window.scrollY - lineHeight * 1.5;

      setMenuPosition({
        top: menuTop,
        left: left + window.scrollX,
        visible: true,
      });
    } else {
      setMenuPosition((prev) => ({ ...prev, visible: false }));
    }
  };

  const applyStyle = (style) => {
    const textarea = textareaRef.current;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    if (selectionStart === selectionEnd) return;

    const before = content.slice(0, selectionStart);
    const selected = content.slice(selectionStart, selectionEnd);
    const after = content.slice(selectionEnd);

    let formattedText;
    switch (style) {
      case "bold":
        formattedText = `${before}**${selected}**${after}`;
        break;
      case "italic":
        formattedText = `${before}*${selected}*${after}`;
        break;
      case "underline":
        formattedText = `${before}<u>${selected}</u>${after}`;
        break;
      case "link":
        const url = prompt("Enter URL:", "https://");
        if (url) {
          formattedText = `${before}[${selected}](${url})${after}`;
        } else {
          return;
        }
        break;
      default:
        return;
    }

    setContent(formattedText);
    setMenuPosition((prev) => ({ ...prev, visible: false })); // Hide menu after applying style
  };

  return (
    <div style={{ position: "relative", marginTop: "20px" }}>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onMouseUp={handleMouseUp}
        style={{
          width: "100%",
          height: "200px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          lineHeight: "1.5",
        }}
      ></textarea>
      {menuPosition.visible && (
        <div
          ref={menuRef}
          className="menu"
          style={{
            position: "absolute",
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            background: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            padding: "5px",
            zIndex: 1000,
            display: "flex",
            gap: "5px",
          }}
        >
          <button onClick={() => applyStyle("bold")}>
            <b>B</b>
          </button>
          <button onClick={() => applyStyle("italic")}>
            <i>I</i>
          </button>
          <button onClick={() => applyStyle("underline")}>
            <u>U</u>
          </button>
          <button onClick={() => applyStyle("link")}>Link</button>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
