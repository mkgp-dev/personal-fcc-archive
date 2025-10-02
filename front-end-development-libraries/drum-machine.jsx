// Libraries
import React from "https://esm.sh/react@19";
import ReactDOM from "https://esm.sh/react-dom@19/client";
//import _, { map } from "https://esm.sh/underscore";

// Pads
const pads = [
  { key: 'Q', name: 'Heater 1', id: 'Heater-1', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3' },
  { key: 'W', name: 'Heater 2', id: 'Heater-2', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3' },
  { key: 'E', name: 'Heater 3', id: 'Heater-3', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3' },
  { key: 'A', name: 'Heater 4', id: 'Heater-4', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3' },
  { key: 'S', name: 'Clap', id: 'Clap', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' },
  { key: 'D', name: 'Open High Hats', id: 'Open-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' },
  { key: 'Z', name: 'Kick n\' Hat', id: 'Kick-N-Hat', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3' },
  { key: 'X', name: 'Kick', id: 'Kick', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' },
  { key: 'C', name: 'Closed High Hat', id: 'Closed-HH', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3' }
];

// Base
function Drum() {
  const [ config, setConfig ] = React.useState({
    display: 'Press a key to start',
    active_key: null,
    volume: 0.5
  });
  const [ error, setError ] = React.useState('');
  // rendering issue with range solve using this method.
  const vol = React.useRef(config.volume);
  
  const play = React.useCallback((key) => {
    const id = String(key).toUpperCase();
    const audio = document.getElementById(id);
    const pad = pads.find((p) => p.key === id);
    if (!pad || !audio) {
      return;
    }
    
    try {
      audio.currentTime = 0;
      audio.volume = vol.current;
      audio.play();
      
      setConfig(s => ({
        ...s,
        display: pad.name,
        active_key: id
      }));
      setTimeout(() => setConfig(s => ({...s, active_key: null})), 120);
    } catch(err) {
      console.error(err.message);
      setError(err.message);
    }
  }, []);

  const adjustVol = (e) => {
    const value = Number(e.target.value);
    setConfig(s => ({ ...s, volume: value }));
  };
  
  React.useEffect(() => {
    // this should fix the problem
    vol.current = config.volume;
    const keydown = (e) => {
      const key = e.key?.toUpperCase();
      if (pads.some((p) => p.key === key)) {
        e.preventDefault();
        play(key);
      }
    };
    
    // Doesn't pass with test number 6.
    //var limit_keypress = _.debounce(keydown, 100);
    document.addEventListener('keydown', keydown);
    // listener leak avoided
    return () => document.removeEventListener('keydown', keydown)
  }, [play, config.volume]);
  return(
    <main className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row">
        <div className="col">
          <div className="card launchpad" id="drum-machine">
            <div className="card-body">
              { error && (
                <div className="alert alert-danger">
                  {error}
                </div>
              )}
              <div className="row g-2 g-md-3">
                {pads.map((pad) => (
                  <div className="col-4" key={pad.key}>
                    <button
                      id={pad.id}
                      className={`drum-pad btn-pad ${ config.active_key === pad.key ? 'pad-active' : '' }`}
                      onClick={() => play(pad.key) }
                      type="button"
                      >
                      {pad.key}
                      <audio className="clip" id={pad.key} src={pad.src} preload="auto" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <input className="form-range" type="range" min="0" max="1" step="0.1" value={config.volume ?? 0} onChange={adjustVol} />
                </div>
                <div className="p-1 border border-secondary rounded">
                  <p className="m-0" id="display">{config.display}</p>
                </div>
              </div>
            </div>
          </div>
          <footer className="text-center">
            <p className="mt-2 text-muted">Made with love by <a href="https://github.com/mkgp-dev" className="text-decoration-none" target="_blank" rel="noreferrer">@mkgp-dev</a></p>
          </footer>
        </div>
      </div>
    </main>
  );
}

// Render
ReactDOM.createRoot(document.getElementById('root')).render(<Drum />);
