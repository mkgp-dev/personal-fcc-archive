// Lib
import React from "https://esm.sh/react@19";
import ReactDOM from "https://esm.sh/react-dom@19/client";

// Base
function Calculator() {
  const [ calc, setConfig ] = React.useState({
    raw: [],
    display: '0',
    previous: null,
    current: '0',
    operator: null,
    boolean: false
  });
  
  // Global
  const MAX_NUM = 9;
  
  // Just converters and helpers
  const defString = (s) => s.toString();
  const defNumber = (s) => {
    if (s === '' || s === '-' || s === '-0') {
      return 0;
    }
    return parseFloat(s);
  };
  const formatNum = (n) => {
    const round = Number(Math.round(Number(n + 'e10')) + 'e-10');
    return round.toFixed(10).replace(/\.?0+$/, '');
  };
  const stringLen = (l) => l.replace('-', '').length;
  
  // Digits being inputted for display
  const inputNum = (n) => {
    n = defString(n);
    
    if (calc.boolean) {
      setConfig(s => ({ ...s, previous: null, operator: null, boolean: false, raw: [], display: n, current: n }));
      return;
    }
    
    if (calc.display === '0') {
      setConfig(s => ({ ...s, display: n, current: n }));
      return;
    }
    
    const curr = calc.current + n;
    if (stringLen(curr) > MAX_NUM) {
      return;
    }
    
    setConfig(s => ({ ...s, display: curr, current: curr }));
  };
  
  // Operators for computation
  const useOp = (o) => {
    if (calc.boolean) {
      const prev = calc.previous === null ? [] : [formatNum(calc.previous)];
      setConfig(s => ({ ...s, raw: [ ...prev, o ], operator: o, boolean: false, current: '' }));
      return;
    }
    
    const ops = /[+\-x/]/;
    
    // Test 13: [ 5 * - + 5 = 10 ] fixed
    if (calc.current === '-' && calc.previous !== null && ops.test(o)) {
      setConfig(s => ({ ...s, current: '', operator: o, display: defString(calc.previous) }));
      return;
    }
    
    // continuous
    if (calc.current === '' && calc.previous !== null) {
      // fixed negative bug
      if (o === '-' && !!calc.operator) {
        setConfig(s => ({ ...s, current: '-', display: defString('-') }));
      } else {
        setConfig(s => ({ ...s, operator: o, raw: [ ...s.raw, o ] }));
      }
      return;
    }
    
    // init
    if (calc.previous === null) {
      const n = defNumber(calc.current);
      const u = formatNum(n);
      const m = defString(u);
      setConfig(s => ({ ...s, previous: n, operator: o, current: '', display: m, raw: [u, o] }));
      return;
    }
    
    // sign of laziness, compute automatically
    if (calc.operator !== null && calc.current !== '' && calc.current !== '-') {
      const prev = calc.previous;
      const curr = defNumber(calc.current);
      const comp = formatNum(compute(prev, calc.operator, curr));
      setConfig(s => ({ ...s, previous: defNumber(comp), operator: o, current: '', display: comp, raw: [ ...s.raw, formatNum(curr), o ] }));
      return;
    }
    
    setConfig(s => ({ ...s, operator: o }));
  };
  
  // Clear
  const clear = () => {
    setConfig({
      raw: [],
      display: '0',
      previous: null,
      current: '0',
      operator: null
    });
  };
  
  // Basic Computation
  const compute = (a, x, b) => {
    switch(x) {
      case '+':
        return a + b;
      
      case '-':
        return a - b;

      case 'x':
        return a * b;
      
      case '/':
        return a / b;
      
      default:
        return b;
    }
  };
  
  // Usage of decimal
  const useDec = () => {
    const curr = calc.current;
    
    if (curr.indexOf('.') !== -1) {
      return curr;
    }
    
    if (curr === '' || curr === '-') {
      const dec = curr === '-' ? '-0.' : '0.';
      setConfig(s => ({ ...s, current: dec, display: defString(dec) }));
      return;
    }
    
    const dec = curr + ".";
    if (stringLen(dec) > MAX_NUM) {
      return;
    }
    
    setConfig(s => ({ ...s, current: dec, display: defString(dec) }));
  };
  
  // User hits equals
  const useEqual = () => {
    if (calc.operator === null) {
      if (calc.current === '') {
        setConfig(s => ({ ...s, display: defString(calc.previous), boolean: true }));
        return;
      }
      
      setConfig(s => ({ ...s, display: calc.current, boolean: true }));
      return;
    }
    
    if (calc.current === '' || calc.current === '-') {
      const prev = calc.previous === null ? '0' : formatNum(calc.previous);
      setConfig(s => ({ ...s, display: prev, current: '', previous: parseFloat(prev), operator: null, raw: [ calc.previous ], boolean: true }));
      return;
    }
    
    const prev = calc.previous === null ? 0 : calc.previous;
    const curr = defNumber(calc.current);
    const comp = formatNum(compute(prev, calc.operator, curr));
    
    setConfig(s => ({ ...s, previous: defNumber(comp), current: '', operator: null, display: comp, raw: [ comp ], boolean: true }));
  };
  
  // Computation to track
  const rawString = () => {
    const curr = calc.current !== '' ? [calc.current] : [];
    return [...calc.raw, ...curr].join(' ');
  };
  
  return (
    <main className="d-flex align-items-center justify-content-center vh-100">
      <div className="calculator card shadow-sm border-0">
        {/* display */}
        <div className="card-body">
          {/* debug box
          <div className="alert alert-info">
            <p className="m-0">Raw: {calc.raw}</p>
            <p className="m-0">Display: {calc.display}</p>
            <p className="m-0">Current: {calc.current}</p>
            <p className="m-0">Previous: {calc.previous}</p>
            <p className="m-0">Operator: {calc.operator}</p>
            <p className="m-0">Boolean: {calc.boolean ? 'T' : 'F'}</p>
          </div>
           */}
          <div id="display" className="calculator-display mb-1">
            {calc.display}
          </div>
          <span className="badge text-bg-dark mb-2 w-100">{rawString()}</span>
          <div className="row g-1">
            {/* left side */}
            <div className="col-9">
              {/* clear button, divide */}
              <div className="row g-1">
                <div className="col-8">
                  <button id="clear" className="calculator-clear-btn w-100" onClick={clear}>AC</button>
                </div>
                <div className="col-4">
                  <button id="divide" className="calculator-divide-btn w-100" onClick={() => useOp('/')}>/</button>
                </div>
                {/* 7, 8, 9 */}
                <div className="col-4">
                  <button id="seven" className="calculator-btn w-100" onClick={() => inputNum('7')}>7</button>
                </div>
                <div className="col-4">
                  <button id="eight" className="calculator-btn w-100" onClick={() => inputNum('8')}>8</button>
                </div>
                <div className="col-4">
                  <button id="nine" className="calculator-btn w-100" onClick={() => inputNum('9')}>9</button>
                </div>
                {/* 4, 5, 6 */}
                <div className="col-4">
                  <button id="four" className="calculator-btn w-100" onClick={() => inputNum('4')}>4</button>
                </div>
                <div className="col-4">
                  <button id="five" className="calculator-btn w-100" onClick={() => inputNum('5')}>5</button>
                </div>
                <div className="col-4">
                  <button id="six" className="calculator-btn w-100" onClick={() => inputNum('6')}>6</button>
                </div>
                {/* 1, 2, 3 */}
                <div className="col-4">
                  <button id="one" className="calculator-btn w-100" onClick={() => inputNum('1')}>1</button>
                </div>
                <div className="col-4">
                  <button id="two" className="calculator-btn w-100" onClick={() => inputNum('2')}>2</button>
                </div>
                <div className="col-4">
                  <button id="three" className="calculator-btn w-100" onClick={() => inputNum('3')}>3</button>
                </div>
                {/* 0, decimal */}
                <div className="col-8">
                  <button id="zero" className="calculator-btn w-100" onClick={() => inputNum('0')}>0</button>
                </div>
                <div className="col-4">
                  <button id="decimal" className="calculator-btn w-100" onClick={useDec}>.</button>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="col-3 d-grid gap-1">
              {/* multiply, subtract, add, equal */}
              <button id="multiply" className="calculator-opr-btn" onClick={() => useOp('x')}>x</button>
              <button id="subtract" className="calculator-opr-btn" onClick={() => useOp('-')}>-</button>
              <button id="add" className="calculator-opr-btn" onClick={() => useOp('+')}>+</button>
              <button id="equals" className="calculator-opr-btn" onClick={useEqual}>=</button>
            </div>
          </div>
        </div>
        <p className="text-center mt-2 text-muted">
          Made with love by <a href="https://github.com/mkgp-dev" className="text-decoration-none" target="_blank" rel="noreferrer">@mkgp-dev</a>
          </p>
      </div>
    </main>
  );
}

// Render
ReactDOM.createRoot(document.getElementById('root')).render(<Calculator />);
