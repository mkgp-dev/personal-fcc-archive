// You can view this fully on https://codepen.io/mkgp-dev/pen/ogbLPma
// React
import React from "https://esm.sh/react@19";
import ReactDOM from "https://esm.sh/react-dom@19/client";
import DOMPurify from "https://esm.sh/dompurify";

// Base
function Markdown() {
  document.documentElement.setAttribute("data-bs-theme", "dark");
  document.documentElement.setAttribute("data-bs-core", "modern");
  
  // Convert Markdown to HTML
  React.useMemo(() => {
    marked.use({
      gfm: true,
      breaks: true
    });
  }, []);
  
  // Variables
  const [ html, setHTML ] = React.useState('');
  const [ input, setInput ] = React.useState([
    '# Markdown Previewer',
    '## Made by Mark Pelayo',
    '',
    '`markedjs` is built for **speed** and light-weight while implementing all _markdown features_ from the supported flavors & specifications.',
    '> You can also use blockquote here, sheesh.',
    '',
    'You can make a list like your favorite languages such as:',
    '- JavaScript',
    '- PHP',
    '- HTML',
    '- CSS',
    '',
    'You can create a link, visit my [Github Profile](https://github.com/mkgp-dev)',
    'You can insert images like this below',
    '![awesome cat](https://imgflip.com/s/meme/Cute-Cat.jpg)',
    '',
    'You can insert codes',
    '```js',
    '// basic block',
    'function greet(n) {',
    ' console.log("Hello, ", n);',
    '{',
    'greet("Mark");',
    '```',
    '',
    'You can create tables',
    '| Options used | Description |',
    '|----------|----------|',
    '| gfm | If true, use approved GitHub Flavored Markdown (GFM) specification. |',
    '| breaks | If true, add <br> on a single line break (copies GitHub behavior on comments, but not on rendered markdown files). |'
  ].join('\n'));
  
  // Realtime changes with Sanitation
  React.useEffect(() => {
    const html = input ? marked.parse(input) : '';
    const sanitize = DOMPurify.sanitize(html);
    setHTML(sanitize);
  }, [input, DOMPurify]);
  
  // FCC doesn't detect my query
  const queryFCC = (m) => {
    const html = m ? marked.parse(m) : '';
    setHTML(DOMPurify.sanitize(html));
  };
  
  return (
    <main className="container-fluid mt-5 mb-5">
      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header">Editor</div>
            <div className="card-body">
              <textarea
                id="editor"
                className="form-control"
                rows={28}
                onChange={(e) => {setInput(e.target.value); }}
                onInput={(e) => { queryFCC(e.target.value); }}
                onKeyUp={(e) => { queryFCC(e.target.value); }}
                value={input}
                spellCheck={false}
                placeholder='Try inputting in a Github Manner.'
                />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card h-100">
            <div className="card-header">Preview</div>
            <div className="card-body preview-limit overflow-auto">
              <article id="preview" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center mt-3">Made with love by <a href="https://github.com/mkgp-dev" className="text-decoration-none" rel="noreferrer" target="_blank">@mkgp-dev</a></footer>
    </main>
  );
}

// Render
ReactDOM.createRoot(document.getElementById('root')).render(<Markdown />);
