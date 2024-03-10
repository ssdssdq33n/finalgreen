import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="footter px-[9%] mx-0 py-5">
        <div className="flex py-5">
          <div className="DangKi">
            <div className="flex grid align-items-center">
              <div className="col-3">
                <p className="text-[15px] font-[700] text-[#fff] flex">
                  ĐĂNG KÝ
                </p>
              </div>
              <div className="col-6 p-inputgroup flex-1 px-0">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-envelope"></i>
                </span>
                <InputText placeholder=" email" className="" />
              </div>
              <div className="col-3 ">
                <Button
                  label="Đăng Ký"
                  className="text-[white] h-2rem text-[12px] bg-[#000] w-full hover:bg-[#F0E68C]"
                />
              </div>
            </div>
          </div>

          <div className="DangKi1">
            <div className="flex grid">
              <div className="col-7">
                <p className="text-[17px] font-[700] text-[#fff] flex">
                  KẾT NỐI VỚI CHÚNG TÔI
                </p>
              </div>
              <div className="col-1 iconMau">
                <i className="pi pi-facebook hover:text-[#F0E68C] text-[25px]"></i>
              </div>
              <div className="col-1 iconMau">
                <i className="pi pi-google hover:text-[#F0E68C] text-[25px]"></i>
              </div>
              <div className="col-1 iconMau">
                <i className="pi pi-instagram hover:text-[#F0E68C] text-[25px]"></i>
              </div>
              <div className="col-1 iconMau">
                <i className="pi pi-twitter hover:text-[#F0E68C] text-[25px]"></i>
              </div>
              <div className="col-1 iconMau">
                <i className="pi pi-youtube hover:text-[#F0E68C] text-[25px]"></i>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex grid ChuP py-5">
          <div className="col-4 ChuP2">
            <h1>Về Merriman</h1>
            <p>Thời trang Merriman là thương hiệu trực thuộc</p>
            <p>Tổng Công Ty Cổ Phần Dệt May Hòa Thọ - Top05</p>
            <p>doanh nghiệp dệt may lớn nhất toàn quốc. Kế</p>
            <p>thừa những kỹ thuật sản xuất vượt trội của Hòa</p>
            <p>Thọ, sản phẩm của Merriman luôn đem đến sự</p>
            <p>hài lòng vượt trội cho khách hàng về form dáng</p>
            <p>và chất liệu.</p>
            <p>
              <i className="pi pi-map-marker mr-[5px]"></i>
              36 Ông Ích Đường, phường Hòa Thọ Đông,
            </p>
            <p>quận Cẩm Lệ, thành phố Đà Nẵng</p>
            <p className="flex items-center">
              <i className="pi pi-phone mr-[5px]"></i>
              1800 1760
            </p>
            <p className="flex items-center ">
              <i className="pi pi-envelope mr-[5px]"></i>
              merrimanfashion@hoatho.com.vn
            </p>
            <img
              src="https://theme.hstatic.net/1000102419/1001070932/14/footer_logobct_img.png?v=614"
              alt=""
              className="py-3"
            />
          </div>
          <div className="col-4 ChuP1">
            <h1>Hỗ trợ khách hàng</h1>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>
              Hướng dẫn mua hàng
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>
              Điều khoản sử dụng
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Chính
              sách đổi trả
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Chính
              sách thẻ thành viên
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i> Chính
              sách bảo mật
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Chính
              sách vận chuyển và thời gian giao hàng
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Chính
              sách thanh toán
            </p>
          </div>
          <div className="col-2 ChuP1">
            <h1>Liên kết</h1>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Đồng phục
              công ty
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Áo thun
              nam cao cấp
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Quần
              short nam kaki
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Áo polo
              nam cao cấp
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Đồng phục
              công sở
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Đồng phục
              Team building
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Đồng phục
              Vest công sở
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>May đồng
              phục công ty
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>May đồng
              phục bảo hộ
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>May đồng
              phục áo thun
            </p>
          </div>
          <div className="col-2 ChuP1">
            <h1>Thông tin thêm</h1>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Tìm kiếm
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Giới
              thiệu
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Khuyến
              Mãi
            </p>
            <p className="flex items-center hover:text-[#F0E68C]">
              <i className="pi pi-circle-fill mr-[5px] text-[5px]"></i>Hệ thống
              Merriman
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
