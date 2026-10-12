import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Upload, Home, Ruler, ClipboardCheck, Sparkles, ShieldCheck, Image as ImageIcon, RotateCcw } from "lucide-react";
import "./styles.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [results, setResults] = useState(false);
  const [error, setError] = useState("");

  function handleFile(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith("image/")) {
      setError("Please choose an image file, such as JPG, PNG, or WEBP.");
      return;
    }
    setError("");
    setResults(false);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function analyzeProperty() {
    if (!file) {
      setError("Please upload a property image before analysing.");
      setResults(false);
      return;
    }
    setError("");
    setResults(true);
  }

  function resetForm() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview("");
    setResults(false);
    setError("");
    const input = document.getElementById("property-image");
    if (input) input.value = "";
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="AI Property Valuation home">
          <span className="brand-icon"><Home size={21} /></span>
          <span>AVS<span className="brand-light"> Valuation</span></span>
        </a>
        <span className="secure-note"><ShieldCheck size={15} /> Demo workspace</span>
      </header>

      <main className="main-content">
        <section className="intro">
          <div className="eyebrow"><Sparkles size={15} /> SMART PROPERTY INSIGHTS</div>
          <h1>AI Property <span>Valuation</span></h1>
          <p>Upload a property photo to explore a sample property assessment in seconds.</p>
        </section>

        <section className="workspace">
          <div className="upload-card">
            <div className="section-heading">
              <span className="step-number">01</span>
              <div><h2>Upload property image</h2><p>Choose a clear photo of the property exterior.</p></div>
            </div>

            <label className={`upload-zone ${preview ? "has-image" : ""}`} htmlFor="property-image">
              {preview ? (
                <img className="preview-image" src={preview} alt="Selected property preview" />
              ) : (
                <span className="upload-placeholder">
                  <span className="upload-icon"><ImageIcon size={28} /></span>
                  <strong>Tap to upload an image</strong>
                  <span>JPG, PNG or WEBP</span>
                  <span className="browse-button"><Upload size={16} /> Choose image</span>
                </span>
              )}
            </label>
            <input id="property-image" type="file" accept="image/*" onChange={handleFile} />

            {file && <p className="file-name"><ImageIcon size={15} /> {file.name}</p>}
            {error && <p className="error-message" role="alert">{error}</p>}

            <button className="analyze-button" onClick={analyzeProperty}>
              <Sparkles size={17} /> Analyze Property
            </button>
            <p className="privacy-note">Your photo is previewed locally in this demo.</p>
          </div>

          <div className="results-card">
            <div className="section-heading">
              <span className="step-number">02</span>
              <div><h2>Property insights</h2><p>Sample results from a demo analysis.</p></div>
            </div>
            {!results ? (
              <div className="empty-state">
                <span className="empty-icon"><ClipboardCheck size={29} /></span>
                <strong>Your results will appear here</strong>
                <p>Upload a property image, then select <b>Analyze Property</b> to view the sample assessment.</p>
                <div className="result-preview">
                  <div><Home size={17} /><span>Property type</span><b>—</b></div>
                  <div><Ruler size={17} /><span>Estimated area</span><b>—</b></div>
                  <div><ClipboardCheck size={17} /><span>Condition</span><b>—</b></div>
                </div>
              </div>
            ) : (
              <div className="results-content" aria-live="polite">
                <div className="success-label"><span className="success-dot" /> Demo analysis complete</div>
                <div className="hero-result">
                  <span>Sample estimated value</span>
                  <strong>₹ 85,00,000</strong>
                  <small>Illustrative value only · Not a real valuation</small>
                </div>
                <div className="result-row"><span><Home size={17} /> Property type</span><strong>Independent house</strong></div>
                <div className="result-row"><span><Ruler size={17} /> Estimated area</span><strong>1,500 sq. ft.</strong></div>
                <div className="result-row"><span><ClipboardCheck size={17} /> Property condition</span><strong className="condition">Good</strong></div>
                <p className="disclaimer">These are hard-coded sample values. No AI model or real valuation service is connected.</p>
                <button className="reset-button" onClick={resetForm}><RotateCcw size={15} /> Try another image</button>
              </div>
            )}
          </div>
        </section>
        <p className="bottom-note">Built as a frontend practical assignment · Sample data only</p>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
