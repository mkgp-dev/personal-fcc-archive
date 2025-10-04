// Lib
import React from "https://esm.sh/react@19";
import ReactDOM from "https://esm.sh/react-dom@19/client";

// Base
function Clock() {
  // Default
  const [ clock, setConfig ] = React.useState({
    break: 5,
    session: 25,
    mode: 'Session',
    disable: false,
    time: 25 * 60,
    threshold: false
  });
  
  // Theoretical idea
  // instead of using too much definition of useRef
  // why not put it in one place
  const Ref = React.useRef({
    interval: null,
    switch: null,
    tick: null,
    audio: null,
    init: true,
    resume: null
  });
  
  // Time string
  const time = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };
  
  // Break and Session
  const btnBreak = (n) => {
    const curr = clock.break;
    const change = Math.min(60, Math.max(1, curr + n));
    if (!clock.disable && clock.mode ==='Break') {
      setConfig(s => ({ ...s, time: change * 60 }));
    }
    setConfig(s => ({ ...s, break: change }));
  };
  
  const btnSession = (n) => {
    const curr = clock.session;
    const change = Math.min(60, Math.max(1, curr + n));
    if (!clock.disable && clock.mode ==='Session') {
      setConfig(s => ({ ...s, time: change * 60 }));
    }
    setConfig(s => ({ ...s, session: change }));
  };
  
  // Start and Pause
  const btnInit = () => {
    const status = !clock.disable;
    if (status) {
      let secs;
      if (Ref.current.init) {
        secs = (clock.mode === 'Session' ? clock.session : clock.break);
        setConfig(s => ({ ...s, time: secs * 60 }));
        Ref.current.init = false;
      } else {
        secs = clock.time;
      }
      
      // fix 00:00
      Ref.current.tick = { start: Date.now(), time: secs * 60 };
      setConfig(s => ({ ...s, threshold: false }));
    } else {
      clearInterval(Ref.current.interval);
      Ref.current.interval = null;
    }
    
    setConfig(s => ({ ...s, disable: status }));
  };
  
  // Clock system
  React.useEffect(() => {
    if (!clock.disable || clock.threshold) {
      return;
    }
    
    const start = Date.now();
    const time = clock.time;
    Ref.current.tick = { start, time };
    
    let t = time;
    
    // Fixing 00:00, it doesn't show
    Ref.current.interval = setInterval(() => {
      const curr = Math.floor((Date.now() - Ref.current.tick.start) / 1000);
      const change = Math.max(0, Ref.current.tick.time - curr);
      
      if (change !== t) {
        t = change;
        setConfig(s => ({ ...s, time: change }));
      }
      
      if (change === 0) {
        clearInterval(Ref.current.interval);
        Ref.current.interval = null;
        
        setConfig(s => ({ ...s, threshold: true }));
        
        const a = Ref.current.audio;
        try {
          a?.play();
        } catch(err) {
          console.error('An error has occured', err.message);
        }

        // Clear some residues
        if (Ref.current.switch) clearTimeout(Ref.current.switch);
        if (Ref.current.resume) clearTimeout(Ref.current.resume);
        
        // Fix? yep, 00:00 fixed
        const mode = clock.mode === 'Session' ? 'Break' : 'Session';
        const secs = mode === ' Session' ? clock.session : clock.break;
        
        Ref.current.switch = setTimeout(() => {
          setConfig(s => ({ ...s, mode }));
          
          Ref.current.resume = setTimeout(() => {
            if (clock.disable) {
              Ref.current.tick = { start: Date.now(), time: secs * 60 }
              setConfig(s => ({ ...s, threshold: false, time: secs * 60 }));
            }
          }, 1000);
        }, 1000);
      }
    }, 200);
    
    return () => {
      clearInterval(Ref.current.interval);
      Ref.current.interval = null;
    };
  }, [clock]);
  
  // Reset
  const btnReset = () => {
    clearInterval(Ref.current.interval);
    clearTimeout(Ref.current.switch);
    clearTimeout(Ref.current.resume);
    Ref.current.interval = null;
    Ref.current.switch = null;
    Ref.current.resume = null;
    Ref.current.init = true;
    
    setConfig({
      break: 5,
      session: 25,
      mode: 'Session',
      disable: false,
      time: 25 * 60,
      threshold: false
    });
    
    const audio = Ref.current.audio;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };
  
  return (
    <main className="d-flex align-items-center justify-content-center vh-100">
      <div className="clock">
        {/* timer */}
        <div className="text-center">
          <div id="timer-label" className="clock-mode badge text-bg-info">{clock.mode}</div>
          <div id="time-left" className="clock-timer">{time(clock.time)}</div>
        </div>
        <div className="row g-3 mb-3">
          {/* break length */}
          <div className="col-sm-6">
            <div className="card">
              <div class="card-body">
                <p id="break-label" className="text-center mb-3">Break Length</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <button
                      id="break-decrement"
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => btnBreak(-1)}
                      disabled={clock.disable}
                    ><i className="fa-solid fa-minus"></i>
                    </button>
                    <div id="break-length" className="clock-length">{clock.break}</div>
                    <button
                      id="break-increment"
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => btnBreak(1)}
                      disabled={clock.disable}
                      ><i class="fa-solid fa-plus"></i>
                      </button>
                  </div>
              </div>
            </div>
          </div>
          {/* session length */}
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <p id="session-label" className="text-center mb-3">Session Length</p>
                <div className="d-flex align-items-center justify-content-between">
                  <button
                    id="session-decrement"
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => btnSession(-1)}
                    disabled={clock.disable}
                  ><i className="fa-solid fa-minus"></i>
                    </button>
                  <div id="session-length" className="clock-length">{clock.session}</div>
                  <button
                    id="session-increment"
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => btnSession(1)}
                    disabled={clock.disable}
                  ><i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* controls */}
        <div className="d-flex justify-content-center gap-2">
            <button
              id="start_stop"
              type="button"
              className={`btn ${clock.disable ? 'btn-outline-warning' : 'btn-outline-success' } btn-lg`}
              onClick={btnInit}
            >{clock.disable ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i> }
            </button>
            <button
              id="reset"
              type="button"
              className="btn btn-danger btn-lg"
              onClick={btnReset}
            ><i className="fa-solid fa-trash me-1"></i>Reset everything
            </button>
        </div>
        {/* beep audio */}
        <audio
            id="beep"
            ref={(a) => { Ref.current.audio = a; }}
            preload="auto" src="https://raw.githubusercontent.com/mkgp-dev/personal-fcc-archive/refs/heads/main/media/beep.mp3"
          />
        <footer className="text-center">
          <p className="mt-2 text-muted">Made with love by <a href="https://github.com/mkgp-dev" className="text-decoration-none" target="_blank" rel="noreferrer">@mkgp-dev</a></p>
        </footer>
      </div>
    </main>
  );
}

// Render
ReactDOM.createRoot(document.getElementById('root')).render(<Clock />);
