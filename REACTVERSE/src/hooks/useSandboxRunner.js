export default function useSandboxRunner() {
  function run(code, tests) {
    return new Promise((resolve) => {
      const iframe = document.getElementById("preview");

      // Clean up previous listener
      window.onmessage = null;

      // Remove ES6 module syntax from code
      const cleanedCode = code
        .replace(/import\s+.*?from\s+['"].*?['"];?/g, "") // Remove imports
        .replace(/export\s+default\s+/g, "") // Remove export default
        .replace(/export\s+/g, ""); // Remove export

      iframe.srcdoc = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body {
                margin: 0;
                padding: 20px;
                font-family: system-ui, -apple-system, sans-serif;
                background: #f8fafc;
              }
              .counter-container {
                max-width: 400px;
                margin: 0 auto;
                padding: 2rem;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .counter-container h2 {
                text-align: center;
                font-size: 2rem;
                color: #1e293b;
                margin-bottom: 1.5rem;
              }
              .button-group {
                display: flex;
                gap: 0.5rem;
                flex-direction: column;
              }
              .btn {
                padding: 0.75rem 1.5rem;
                font-size: 1rem;
                font-weight: 600;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
              }
              .btn-increment {
                background: #3b82f6;
                color: white;
              }
              .btn-increment:hover {
                background: #2563eb;
              }
              .btn-decrement {
                background: #ef4444;
                color: white;
              }
              .btn-decrement:hover {
                background: #dc2626;
              }
              .btn-reset {
                background: #6b7280;
                color: white;
              }
              .btn-reset:hover {
                background: #4b5563;
              }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
            <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            
            <script type="text/babel">
              const { useState } = React;
              
              ${cleanedCode}
              
              // Initial render
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(<Counter />);
              
              // Expose remount function globally
              window.remountCounter = function() {
                root.render(<Counter />);
              };
            </script>
            
            <script>
              (async function runTests() {
                const tests = ${JSON.stringify(tests)};
                const results = [];
                
                // Wait for React to render
                await new Promise(r => setTimeout(r, 300));
                
                for (const test of tests) {
                  try {
                    // Remount component before each test for isolation
                    window.remountCounter();
                    await new Promise(r => setTimeout(r, 300));
                    
                    await eval(\`(async () => { \${test.script} })()\`);
                    results.push({ 
                      id: test.id, 
                      desc: test.desc, 
                      pass: true 
                    });
                  } catch (error) {
                    results.push({ 
                      id: test.id, 
                      desc: test.desc, 
                      pass: false,
                      error: error.message
                    });
                  }
                }
                
                window.parent.postMessage(results, '*');
              })();
            </script>
          </body>
        </html>
      `;

      // Set up message listener with timeout
      const timeout = setTimeout(() => {
        resolve([{ id: 0, desc: "Test timeout", pass: false }]);
      }, 10000);

      window.onmessage = (e) => {
        clearTimeout(timeout);
        resolve(e.data);
      };
    });
  }

  return { run };
}
