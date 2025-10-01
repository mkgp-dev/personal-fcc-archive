// You can view this fully on https://codepen.io/mkgp-dev/pen/JoGKdEz
// React 19
import React from "https://esm.sh/react@19";
import ReactDOM from "https://esm.sh/react-dom@19/client";
import { useState, useEffect, useMemo } from "https://esm.sh/react@19";

function Quote() {
  // Dark theme
  document.documentElement.setAttribute("data-bs-theme", "dark");
  document.documentElement.setAttribute("data-bs-core", "modern");
  
  // State
  const [ quote, setQuote ] = useState({
    content: '',
    author: ''
  });
  const [ status, setStatus ] = useState({
    bool: false,
    message: ''
  });
  
  // Fetch
  const fetchQuote = async() => {
    setStatus(s => ({ ...s, bool: true }));
    
    try {
      const response = await fetch('https://thequoteshub.com/api/random-quote?format=json');
      if (!response.ok) {
        console.error('HTTP status error code:', response.status);
        setStatus(s => ({ ...s, message: 'HTTP status error code: ' + response.status }));
      }
      
      const data = await response.json();
      setQuote({
        content: data?.text ?? 'Seems like an error has occured, dang.',
        author: data?.author ?? 'Mark Pelayo'
      });
    } catch(err) {
      setStatus(s => ({ ...s, message: err.message }));
      console.error(err.message);
    } finally {
      setStatus(s => ({ ...s, bool: false }));
    }
  };
  
  // Init Quote
  useEffect(() => {
    fetchQuote();
  }, []);
  
  // X (so called Twitter) Share link
  const xhref = useMemo(() => {
    const text = `${quote.content} - ${quote.author}`;
    const text_encode = new URLSearchParams({ text: text });
    return `https://twitter.com/intent/tweet?${text_encode.toString()}`;
  }, [quote]);
  
  return(
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <main id="quote-box" className="quote-container">
        { status?.message && (
          <div class="alert alert-danger" role="alert">
            {status.message}
          </div>
        )}
        <figure>
          <blockquote className="blockquote">
            { status.bool || !quote.content
            ? <p className="text-muted placeholder-glow">
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-6"></span>
              </p>
            : <p id="text">{quote.content}</p> }
          </blockquote>
          <figcaption id="author" className="blockquote-footer">
            { status.bool || !quote.author
            ? <span className="placeholder col-4"></span>
            : quote.author }
          </figcaption>
        </figure>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <a className="btn btn-primary" href={xhref} id="tweet-quote" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-x-twitter me-1"></i>Share this quote
          </a>
          <button className="btn btn-outline-primary" id="new-quote" disabled={status.bool} onClick={fetchQuote}>Generate</button>
        </div>
        <footer className="text-center">
          <p className="mt-1 text-muted">Made with love by <a href="https://github.com/mkgp-dev" className="text-decoration-none" target="_blank" rel="noreferrer">@mkgp-dev</a></p>
        </footer>
      </main>
    </div>
  );
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Quote />);
