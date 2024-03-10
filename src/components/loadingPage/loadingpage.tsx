"use client";
import { ProgressSpinner } from "primereact/progressspinner";

const LoadingPage = () => {
  return (
    <div className="w-full h-full flex justify-center align-items-center">
      <ProgressSpinner
        style={{ width: "24px", height: "24px" }}
        strokeWidth="8"
        animationDuration=".5s"
        className="z-5"
      />
    </div>
  );
};

export default LoadingPage;
