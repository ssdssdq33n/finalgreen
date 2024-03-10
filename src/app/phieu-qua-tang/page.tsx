"use client";
import Navbar from "@/components/navbar/navbar";
import { Image } from "primereact/image";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "../phieu-qua-tang/phieu-qua.css";
import logo from "./images/phieu-qua-tang.webp";
import anhqua from "./images/phieuquatang.jpg";
import LienHe from "@/components/lienhe/LienHe";
const PhieuQuaTang = () => {
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const cities = [
    { name: "Sản phẩm nổi bật", code: "SP" },
    { name: "Giá : Tăng dần", code: "TD" },
    { name: "Giá : Giảm dần", code: "GD" },
    { name: "Từ A->Z", code: "AZ" },
    { name: "Từ Z->A", code: "ZA" },
    { name: "Cũ nhất", code: "CN" },
    { name: "Mới nhất", code: "MN" },
    { name: "Bán chạy nhất", code: "BC" },
  ];
  return (
    <>
      <div className="flex grid">
        <div className="col-3">
          <Navbar />
        </div>
        <div className="col-9">
          <div className="">
            <Image src={logo.src} alt="Image" width="100%" />
          </div>
          <div className="flex grid my-3">
            <div className="col-9">
              <div className="flex">
                <h1 className="phieuqua-p text-[25px]">
                  Phiếu quà tặng Merriman
                </h1>
                <h1 className="px-4 text-[17px] py-2">3 sản phẩm</h1>
              </div>
            </div>
            <div className="col-3 ">
              <div className="card flex justify-content-center">
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  placeholder="Sắp xếp"
                  className="w-full md:w-14rem theDr text-sm h-2rem  align-items-center"
                />
              </div>
            </div>
          </div>
          <div className="flex grid w-[60%]">
            <div className="col-4">
              <div className="card flex justify-content-center">
                <Card className="text-center theCard">
                  <img alt="Card" src={anhqua.src} className="w-[100%]" />
                  <p className="text-[13px]">
                    Phiếu quà tặng 100.000đ thời trang Merriman
                  </p>
                  <p className="text-13px phieuqua-p">100,000₫</p>
                </Card>
              </div>
            </div>
            <div className="col-4">
              <div className="card flex justify-content-center">
                <Card className="text-center theCard">
                  <img alt="Card" src={anhqua.src} className="w-[100%]" />
                  <p className="text-[13px]">
                    Phiếu quà tặng 100.000đ thời trang Merriman
                  </p>
                  <p className="text-13px phieuqua-p">100,000₫</p>
                </Card>
              </div>
            </div>
            <div className="col-4">
              <div className="card flex justify-content-center">
                <Card className="text-center theCard">
                  <img alt="Card" src={anhqua.src} className="w-[100%]" />
                  <p className="text-[13px]">
                    Phiếu quà tặng 100.000đ thời trang Merriman
                  </p>
                  <p className="text-13px phieuqua-p">100,000₫</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="phieuqua py-4">
        <div className="card ">
          <Card title="">
            <p className="text-center text-[25px] phieuqua-p">
              PHIẾU QUÀ TẶNG MERRIMAN - MÓN QUÀ TẶNG TINH TẾ CHO ĐỐI TÁC
            </p>
            <p className="m-0 mt-3 text-[17px]">
              Phiếu quà tặng Merriman là giải pháp tối ưu cho doanh nghiệp tặng
              đối tác, nhân viên,... phiếu quà tặng vừa sang trọng lại tiện
              dụng. Merriman cung cấp phiếu mua hàng ở nhiều mệnh giá khác nhau:
              200.000, 500.000đ,... tùy theo nhu cầu của người tặng Phiếu quà
              tặng sẽ là một món quà cực kỳ tiện lợi dành cho khách hàng, người
              thân hay bạn bè của bạn. Vừa sang trọng lại tinh tế, lịch sự. Liên
              hệ ngay Merriman để đặt phiếu quà tặng theo nhu cầu của mình nhé!
            </p>
          </Card>
        </div>
      </div>
      <LienHe />
    </>
  );
};

export default PhieuQuaTang;
