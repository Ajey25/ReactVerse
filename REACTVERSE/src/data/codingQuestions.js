export const codingQuestions = {
  1: {
    title: "Build a Counter Component",
    description:
      "Create a functional counter component with increment and decrement functionality using React hooks.",
    requirements: [
      "Use useState hook for state management",
      "Display current count value",
      "Implement increment and decrement buttons",
      "Ensure proper TypeScript/JSX syntax",
    ],
    hints:
      "Remember to initialize state to 0 and make sure your onClick handlers are correctly bound.",
    starterCode: `
import React, { useState } from 'react';

function Counter() {
  // Initialize state here
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h2>Counter: {count}</h2>
      <div className="button-group">
        <button 
          className="btn btn-increment"
          onClick={() => setCount(count + 1)}
        >
          Increment (+)
        </button>
        <button 
          className="btn btn-decrement"
          onClick={() => setCount(count - 1)}
        >
          Decrement (-)
        </button>
        <button 
          className="btn btn-reset"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
    `,
    tests: [
      {
        id: 1,
        desc: "Renders initial count as 0",
        script: `
      const h2 = document.querySelector("h2");
      if (!h2 || !h2.textContent.includes("0")) {
        throw new Error("Initial count should be 0");
      }
    `,
      },
      {
        id: 2,
        desc: "Increment button increases count by 1",
        script: `
      const h2 = document.querySelector("h2");
      const initialCount = parseInt(h2.textContent.match(/\\d+/)[0]);
      
      const incrementBtn = document.querySelector(".btn-increment");
      incrementBtn.click();
      await new Promise(r => setTimeout(r, 300));
      
      const newCount = parseInt(h2.textContent.match(/\\d+/)[0]);
      if (newCount !== initialCount + 1) {
        throw new Error(\`Count should increase by 1. Expected \${initialCount + 1}, got \${newCount}\`);
      }
    `,
      },
      {
        id: 3,
        desc: "Decrement button decreases count by 1",
        script: `
      const h2 = document.querySelector("h2");
      const initialCount = parseInt(h2.textContent.match(/\\d+/)[0]);
      
      const decrementBtn = document.querySelector(".btn-decrement");
      decrementBtn.click();
      await new Promise(r => setTimeout(r, 300));
      
      const newCount = parseInt(h2.textContent.match(/\\d+/)[0]);
      if (newCount !== initialCount - 1) {
        throw new Error(\`Count should decrease by 1. Expected \${initialCount - 1}, got \${newCount}\`);
      }
    `,
      },
    ],
  },
  2: {
    title: "Build a Todo List",
    description: "Create a todo list with add and remove functionality.",
    requirements: [
      "Input field for new todos",
      "Add todo button",
      "List display with remove functionality",
      "State management for todo list",
    ],
    starterCode: "// Todo list starter code",
    tests: [],
  },
};
