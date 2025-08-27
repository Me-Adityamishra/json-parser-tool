import { useState } from "react";
import { FaDownload, FaCheckCircle, FaExclamationCircle, FaFileCode } from "react-icons/fa";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);

  const handleBeautify = () => {
    if (!inputText.trim()) {
      setOutput("Please paste some JSON first!");
      setIsError(true);
      return;
    }
    try {
      const parsed = JSON.parse(inputText);
      setOutput(JSON.stringify(parsed, null, 2));
      setIsError(false);
    } catch (error) {
      setOutput("Invalid JSON! ❌");
      setIsError(true);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.json";
    link.click();
  };

  const handleFetchSample = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const data = await res.json();
      setInputText(JSON.stringify(data, null, 2));
      setOutput("");
      setIsError(false);
    } catch (err) {
      setOutput("Failed to fetch sample JSON ❌");
      setIsError(true);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title"><FaFileCode /> JSON Parser Tool</h1>

        <textarea
          className="textarea"
          placeholder="Paste JSON here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <div className="buttons">
          <button className="btn btn-primary" onClick={handleBeautify}>
            <FaCheckCircle /> Beautify / Validate
          </button>
          <button className="btn btn-secondary" onClick={handleDownload}>
            <FaDownload /> Download JSON
          </button>
          <button className="btn btn-secondary" onClick={handleFetchSample}>
            <FaExclamationCircle /> Load Sample JSON
          </button>
        </div>

        <h2 className="output-title">Output:</h2>
        <pre className={`output ${isError ? "error" : "success"}`}>{output}</pre>
      </div>
    </div>
  );
}

export default App;
