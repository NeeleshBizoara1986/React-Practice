import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeButton: React.FC = () => {
  const context = useContext(ThemeContext);
  if (!context) return null;

  return (
    <button onClick={context.toggleTheme}>
      Current Theme: {context.theme}
    </button>
  );
};

export default ThemeButton;