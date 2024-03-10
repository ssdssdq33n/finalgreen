"use client";
import { Carousel } from "primereact/carousel";

const TopBar = () => {
  return (
    <div className="flex justify-center align-items-center bg-[#080808] ">
      <p className=" topbar text-[#F0E68C] chutop py-1 font-[500] text-[14px] fadeout animation-duration-2000 animation-iteration-infinite">
        Miễn phí vận chuyển với đơn hàng từ 1.000.000đ
      </p>
    </div>
  );
};
export default TopBar;
