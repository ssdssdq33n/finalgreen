"use client";

import Navbar from "@/components/navbar/navbar";

import Content from "@/components/content/Content";
import ContentFoot from "@/components/contentFoot/contentFoot";
import React, { useRef, useState } from "react";

import LienHe from "@/components/lienhe/LienHe";

import { ToastContainer, toast } from "react-toastify";
const Collection = ({ params }: { params: { valueSearch: string } }) => {
  const op = useRef<any>(null);
  const [dataPrice, setDataPrice] = useState<any>([]);
  const [dataPriceCate, setDataPriceCate] = useState<string>("");
  return (
    <>
      <ToastContainer />
      <div>
        <p
          className="py-2 text-[13px] opacity-70 text-[#000]"
          style={{ wordSpacing: "5px !important" }}
        >
          Trang chủ / Áo nam / Áo thun nam cao cấp - Áo polo nam cao cấp
        </p>
        <div className="grid flex">
          <div className="col-3">
            <Navbar
              setDataPriceCate={setDataPriceCate}
              setDataPrice={setDataPrice}
            />
          </div>
          <div className="col-9 ">
            <Content
              dataPrice={dataPrice}
              dataPriceCate={dataPriceCate}
              valueData={params.valueSearch}
            />
          </div>
        </div>
        <div className="mt-3">
          <ContentFoot />
        </div>
        <LienHe />
      </div>
    </>
  );
};
export default Collection;
