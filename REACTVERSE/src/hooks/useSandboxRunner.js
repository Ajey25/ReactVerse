import { useCallback } from "react";

export default function useSandboxRunner() {
  const run = useCallback(async (code, tests, componentName) => {
    return new Promise((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.sandbox = "allow-scripts";
      document.body.appendChild(iframe);

      const safeTests = JSON.stringify(tests);

      const cleanedCode = code
        .replace(/^\s*import\s+.*$/gm, "")
        .replace(/^\s*export\s+default\s+/gm, "");

      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>

  <script>
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  </script>

  <script>
    async function runAllTests() {
      const results = [];
      const tests = ${safeTests};
      const componentName = "${componentName}";

      try {
        const compiled = Babel.transform(\`
          const { useState } = React;
          ${cleanedCode}
        \`, {
          presets: ["react"],
          sourceType: "script"
        }).code;

        // Execute user component
        eval(compiled);

        const root = ReactDOM.createRoot(
          document.getElementById("root")
        );

        const Component = eval(componentName);
        if (typeof Component !== "function") {
          throw new Error(componentName + " component is not defined");
        }

        root.render(React.createElement(Component));
        
        // Wait for initial render
        await sleep(500);
      } catch (err) {
        return [{
          id: 0,
          desc: "Compile / Runtime error",
          pass: false,
          error: err.message
        }];
      }

      // 🧪 Run tests sequentially
      for (const t of tests) {
        try {
          const fn = new Function(
            "sleep",
            \`return (async () => { \${t.script} })()\`
          );
          await fn(sleep);

          results.push({
            id: t.id,
            desc: t.desc,
            pass: true
          });
        } catch (err) {
          results.push({
            id: t.id,
            desc: t.desc,
            pass: false,
            error: err.message
          });
        }
      }

      return results;
    }

    (async () => {
      const results = await runAllTests();
      parent.postMessage({ type: "TEST_RESULTS", results }, "*");
    })();
  </script>
</body>
</html>
      `;

      const handleMessage = (event) => {
        if (event.data?.type === "TEST_RESULTS") {
          window.removeEventListener("message", handleMessage);
          document.body.removeChild(iframe);
          resolve(event.data.results);
        }
      };

      window.addEventListener("message", handleMessage);

      // Timeout after 10 seconds
      setTimeout(() => {
        window.removeEventListener("message", handleMessage);
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
        resolve([
          {
            id: 0,
            desc: "Test timeout",
            pass: false,
            error: "Tests took too long to complete",
          },
        ]);
      }, 20000);

      iframe.srcdoc = html;
    });
  }, []);

  return { run };
}
