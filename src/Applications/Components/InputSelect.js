import React, { useState, useEffect, useRef } from "react";

const TextEditor = () => {
  const editorRef = useRef(null);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent && editorRef.current) {
      editorRef.current.innerHTML = savedContent;
    }
  }, []);

  // Save content to localStorage whenever it changes
  const saveContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      localStorage.setItem("editorContent", content);
    }
  };

  const applyStyle = (command, value = null) => {
    document.execCommand(command, false, value); // Apply the style
    saveContent(); // Save content after applying styles
  };

  const toggleHighlight = () => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const parentNode = selection.anchorNode.parentElement;

    if (parentNode && parentNode.style.backgroundColor === "yellow") {
      // Remove highlight
      document.execCommand("removeFormat");
    } else {
      // Apply highlight
      document.execCommand("hiliteColor", false, "yellow");
    }

    saveContent(); // Save content after highlighting
  };

  const insertInternalLink = () => {
    const url = prompt("Enter the internal link URL:");
    if (url) {
      document.execCommand("createLink", false, url);
      saveContent(); // Save content after inserting link
    }
  };
  const [datas, setDatas] = useState();
  const getData = () => {
    let gtedata = localStorage.getItem("editorContent");
    setDatas(gtedata);
  };
  useEffect(() => {
    setInterval(() => {
      getData();
    }, 100);
  });
  // Process text for rendering (as per Paragraph component logic)
  const processText = (text) => {
    return text
      .replace(/&nbsp;/g, " ")
      .replace(/&#39;/g, "'")
      .replace(
        /<a /g,
        '<a target="_blank" class="font-medium underline text-primary hover:text-text-color transition-all" '
      );
  };
  return (
    <div style={{ marginTop: "20px" }}>
      {/* Formatting menu always at the top */}
      <div
        className="menu"
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          background: "#f9f9f9",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
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
        <button onClick={toggleHighlight} style={{ backgroundColor: "yellow" }}>
          Highlight
        </button>
        <button onClick={insertInternalLink}>Insert Link</button>
      </div>

      {/* Contenteditable Div for editing */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning={true}
        onInput={saveContent} // Save content without resetting cursor
        style={{
          width: "100%",
          minHeight: "200px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          lineHeight: "1.5",
          backgroundColor: "#fff",
        }}
      />

      {/* Rendered content below */}
      <p
        className="text-text text-h5 leading-relaxed tracking-wide pb-3"
        dangerouslySetInnerHTML={{
          __html: processText(datas || ""),
        }}
      ></p>
    </div>
  );
};

export default TextEditor;
