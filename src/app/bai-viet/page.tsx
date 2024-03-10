"use client";
import anh1 from "./image/bv1.webp";
import anh2 from "./image/bv2.webp";
import anh3 from "./image/bv3.webp";
import anh4 from "./image/bv4.webp";
import "./bai-viet.css";
import { Tree } from "primereact/tree";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Image } from "primereact/image";
import React, { useState, useEffect } from "react";
import LienHe from "@/components/lienhe/LienHe";
const BaiViet = () => {
  return (
    <>
      <LienHe />
      <div className="flex grid">
        <div className="col-9">
          <div>
            <p className="py-3">Trang Chủ / Tin tức</p>
            <p className="py-3 text-[30px] trangPhuc-chu">Tin Tức</p>
          </div>
          <div className="flex grid">
            <div className="col-6 px-3">
              <div className="w-[700]">
                <Image
                  src={anh1.src}
                  alt=""
                  className="m-0 image"
                  width="100%"
                />
              </div>
              <div className="trangPhuc">
                <h1 className="text-[20px] trangPhuc-chu ml-2  hover:text-[#F0E68C]">
                  Trang phục ngày tết xưa và nay - Sự khác biệt giữa hơi thở
                  truyền thống và nét đẹp hiện đại
                </h1>
                <p className="text-[17px] ml-2 my-2">
                  Bên cạnh những mâm cỗ, lễ lộc truyền thống theo phong tục thì
                  trang phục cũng là một trong những yếu tố quan...
                </p>
                <p className="text-[17px] py-3 ml-2 text-[#999999]">
                  bởi: Công ty{" "}
                  <i className="pi pi-circle-fill mr-[5px] text-[5px] text-center"></i>{" "}
                  18 Tháng 01, 2024
                </p>
              </div>
            </div>
            <div className="col-6 px-3">
              <div className="w-[700]">
                <Image
                  src={anh2.src}
                  alt=""
                  className="m-0 image"
                  width="100%"
                />
              </div>
              <div className="trangPhuc">
                <h1 className="text-[20px] trangPhuc-chu ml-2  hover:text-[#F0E68C]">
                  Quần ống suông nam đi với giày gì cho outfit thêm phần hoàn
                  thiện?
                </h1>
                <p className="text-[17px] ml-2 my-2">
                  Quần ống suông nam đang là xu hướng thời trang mới nhất hiện
                  nay, không chỉ bởi về mặt thẩm mỹ, phong cách, mà...
                </p>
                <p className="text-[17px] py-3 ml-2 text-[#999999]">
                  bởi: Công ty{" "}
                  <i className="pi pi-circle-fill mr-[5px] text-[5px] text-center"></i>{" "}
                  16 Tháng 01, 2024
                </p>
              </div>
            </div>
            <div className="flex grid my-4">
              <div className="col-6 px-3">
                <div className="w-[700]">
                  <Image
                    src={anh3.src}
                    alt=""
                    className="m-0 image"
                    width="100%"
                  />
                </div>
                <div className="trangPhuc">
                  <h1 className="text-[20px] trangPhuc-chu ml-2  hover:text-[#F0E68C]">
                    Lý Do Nên Sở Hữu Một Chiếc Quần Kaki Nam Hàng Hiệu ?
                  </h1>
                  <p className="text-[17px] ml-2 my-2">
                    Quần kaki là mẫu quần quốc dân mà phái nam ai cũng sở hữu ít
                    nhất một cái. Với đa dạng mẫu mã và màu sắc, quần...
                  </p>
                  <p className="text-[17px] py-3 ml-2 text-[#999999]">
                    bởi: A Bảo{" "}
                    <i className="pi pi-circle-fill mr-[5px] text-[5px] text-center"></i>{" "}
                    18 Tháng 01, 2024
                  </p>
                </div>
              </div>
              <div className="col-6 px-3">
                <div className="w-[700]">
                  <Image
                    src={anh3.src}
                    alt=""
                    className="m-0 image"
                    width="100%"
                  />
                </div>
                <div className="trangPhuc">
                  <h1 className="text-[20px] trangPhuc-chu ml-2  hover:text-[#F0E68C]">
                    Lý Do Nên Sở Hữu Một Chiếc Quần Kaki Nam Hàng Hiệu ?
                  </h1>
                  <p className="text-[17px] ml-2 my-2">
                    Quần kaki là mẫu quần quốc dân mà phái nam ai cũng sở hữu ít
                    nhất một cái. Với đa dạng mẫu mã và màu sắc, quần...
                  </p>
                  <p className="text-[17px] py-3 ml-2 text-[#999999]">
                    bởi: A Bảo{" "}
                    <i className="pi pi-circle-fill mr-[5px] text-[5px] text-center"></i>{" "}
                    18 Tháng 01, 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3 mt-5">
          <div className="card py-5">
            <Accordion activeIndex={0}>
              <AccordionTab header="Bài Viết Mới Nhất">
                <div className="flex grid">
                  <div className=" col-4">
                    <Image src={anh1.src} alt="" />
                  </div>
                  <div className="col-8">
                    <p className="text-[15px] hover:text-[#F0E68C]">
                      CHƯƠNG TRÌNH TRI ÂN DÀNH CHO KHÁCH HÀNG...
                    </p>
                    <p className="text-[12px]">Khuyến mãi - 26.01.2024</p>
                  </div>
                </div>
                <div className="flex grid py-2">
                  <div className=" col-4">
                    <Image src={anh2.src} alt="" />
                  </div>
                  <div className="col-8">
                    <p className="text-[15px] hover:text-[#F0E68C]">
                      Trang phục ngày tết xưa và nay-Sự khác biệt giữa hơi ...
                    </p>
                    <p className="text-[12px]">Tin tức -18.01.2024</p>
                  </div>
                </div>
                <div className="flex grid py-2">
                  <div className=" col-4">
                    <Image src={anh3.src} alt="" />
                  </div>
                  <div className="col-8">
                    <p className="text-[15px] hover:text-[#F0E68C]">
                      Quần ống suông nam đi với giày gì cho outfit thêm phần...
                    </p>
                    <p className="text-[12px]">Khuyến mãi - 26.01.2024</p>
                  </div>
                </div>
                <div className="flex grid py-2">
                  <div className=" col-4">
                    <Image src={anh4.src} alt="" />
                  </div>
                  <div className="col-8">
                    <p className="text-[15px] hover:text-[#F0E68C]">
                      LÝ DO NÊN SỞ HỮU MỘT CHIẾC QUẦN KAKI NAM H...
                    </p>
                    <p className="text-[12px]">Khuyến mãi - 26.01.2024</p>
                  </div>
                </div>
              </AccordionTab>
            </Accordion>
            <Accordion activeIndex={0}>
              <AccordionTab header="Bài Viết Mới Nhất">
                <hr />
                <div className="text-[16px] hover:text-[#F0E68C] py-2">
                  <a href="">Trang Chủ</a>
                </div>
                <hr />
                <div className="text-[16px] hover:text-[#F0E68C] py-2">
                  <a href="">Sản Phẩm</a>
                </div>
                <hr />
                <div className="text-[16px] hover:text-[#F0E68C] py-2">
                  <a href="">Đồng Phục</a>
                </div>
                <hr />
                <div className="text-[16px] hover:text-[#F0E68C] py-2">
                  <a href="">Phiếu Sản Phẩm</a>
                </div>
                <hr />
                <div className="text-[16px] hover:text-[#F0E68C] py-2">
                  <a href="">Bài Viết</a>
                </div>
                <hr />
                <div className="text-[16px] hover:text-[#F0E68C] py-2">
                  <a href="">Phiếu Quà Tặng</a>
                </div>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaiViet;
