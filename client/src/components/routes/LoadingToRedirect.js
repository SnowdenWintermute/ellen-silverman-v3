import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="page-frame">
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p>Redirecting you in {count} seconds</p>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
