import React, { useState } from "react";
import { RiRobot3Fill } from "react-icons/ri";
import "../css/FloatingButton.css";

const FloatingButton = ({ handleClicked }) => {
  const [position, setPosition] = useState({ x: 50, y: 630 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="floating-btn"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <button className="bubble" onClick={handleClicked}>
        <RiRobot3Fill size={30} />
      </button>
    </div>
  );
};

export default FloatingButton;
