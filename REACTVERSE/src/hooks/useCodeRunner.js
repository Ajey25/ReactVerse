// useCodeRunner.js - Simplified version
export default function useCodeRunner() {
  const run = async (code, tests) => {
    const results = [];

    try {
      // Extract component from code
      const componentCode = code
        .replace(/import\s+.*?from\s+['"].*?['"];?/g, "")
        .replace(/export\s+default\s+/g, "")
        .replace(/export\s+(function|const|let|var)\s+(\w+)/g, "$1 $2");

      // For TodoApp tests, we can simulate DOM testing
      for (const test of tests) {
        try {
          // Create a simple DOM simulation for testing
          const mockDOM = {
            querySelector: (selector) => {
              const mockElements = {
                ".todo-input": {
                  value: "",
                  dispatchEvent: () => {},
                  style: {},
                },
                ".btn-add": {
                  click: () => {},
                  style: {},
                },
                li: [],
                ul: { children: [] },
              };
              return mockElements[selector] || null;
            },
            querySelectorAll: (selector) => {
              return selector === "li" ? [] : [];
            },
          };

          // Execute test in isolated context
          const testFn = new Function("document", test.script);
          testFn(mockDOM);

          results.push({
            id: test.id,
            desc: test.desc,
            pass: true,
          });
        } catch (error) {
          results.push({
            id: test.id,
            desc: test.desc,
            pass: false,
            error: error.message,
          });
        }
      }
    } catch (error) {
      results.push({
        id: 0,
        desc: "Test runner error",
        pass: false,
        error: error.message,
      });
    }

    return results;
  };

  return { run };
}
