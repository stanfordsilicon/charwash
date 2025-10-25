import React, { useState } from "react";
import { extractUniqueCharacters } from "../utils/extractChars";
import "../styles/globals.css";

function Home() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");
  const [chars, setChars] = useState([]);

  const handleExtract = () => {
    const uniqueChars = extractUniqueCharacters(text);
    setChars(uniqueChars);
  };

  const handleSave = () => {
    const filename = `${language || "output"}_unique_characters.txt`;
    const file = new Blob([chars.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  // Email click handlers
  const handleBugReport = () => {
    window.location.href =
      "mailto:silicon_project@stanford.edu?subject=CharWash:%20Bug%20Report";
  };

  const handleFeatureRequest = () => {
    window.location.href =
      "mailto:silicon_project@stanford.edu?subject=CharWash:%20Feature%20Request";
  };

  return (
    <div className="home-container">
      <h1 className="logo-heading">
        CharWash
        <img src="/logo.png" alt="CharWash Logo" className="logo-img" />
      </h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-input"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          className="text-input"
        />
      </div>

      <div className="button-group">
        <button className="btn extract-btn" onClick={handleExtract}>
          Extract Characters
        </button>
      </div>

      {chars.length > 0 && (
        <>
          <div className="chars-heading">Unique Extracted Characters</div>

          <div className="chars-box">
            <div className="chars-list">{chars.join(" ")}</div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button className="btn save-btn" onClick={handleSave}>
              Save to File
            </button>
          </div>
        </>
      )}
      {/* Floating Feedback Buttons */}
      <div className="floating-buttons">
        <button className="email-btn" onClick={handleBugReport}>
          Report a Bug
        </button>
        <button className="email-btn" onClick={handleFeatureRequest}>
          Feature Request
        </button>
        <a
          href="https://silicon.stanford.edu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="email-btn">About SILICON</button>
        </a>
      </div>
    </div>
  );
}

export default Home;
