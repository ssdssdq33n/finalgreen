"use client";
import React, { useState } from "react";
import Header from "../header/header";
export const LayoutContext = React.createContext({} as any);
const Component = ({ children }: { children: React.ReactNode }) => {
  const [renderData, setRenderData] = useState<boolean>(false);
  const value = { renderData, setRenderData };
  return (
    <>
      <LayoutContext.Provider value={value}>
        <Header />
        <div className="bg-[#F5F5F5] grid mx-0 my-0 px-[8%]"> {children}</div>
      </LayoutContext.Provider>
    </>
  );
};
export default Component;
