import React, { useEffect, useState } from "react";
import Image from "next/image"; // Assuming you're using next/image
import Popup from "reactjs-popup"; // Assuming you're using this library

interface ProgressBarProps {
  bgcolor: string;
  progress: number;
  height: string;
}

const Progress_bar: React.FC<ProgressBarProps> = ({
  bgcolor,
  progress,
  height,
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(progress);
  }, [progress]);

  const Parentdiv: React.CSSProperties = {
    height: height,
    width: "70%",
    backgroundColor: "white",
    borderRadius: 40,
    marginTop: 50,
  };

  const Childdiv: React.CSSProperties = {
    height: "100%",
    width: `${width}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
    transition: "width 1s ease-in-out",
  };

  const progresstext: React.CSSProperties = {
    padding: 10,
    color: "white",
    fontWeight: 900,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${width}%`}</span>
      </div>
    </div>
  );
};

export default Progress_bar;
