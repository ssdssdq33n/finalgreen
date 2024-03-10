import { Panel } from "primereact/panel";
import { useRef } from "react";
import { Image } from "primereact/image";
import img1 from "./imgs/img1.webp";
import img2 from "./imgs/img2.webp";
import "./contentFooter.css";
const ContentFoot = () => {
  const ref = useRef<any>(null);
  const xuathien: Element | null = document.querySelector(".xuathien");
  const headerPanel = (
    <>
      <h1 className="w-full cursor-pointer flex justify-center text-[20px]">
        Áo thun nam cao cấp Merriman - Chất lượng trong từng sợi vải
      </h1>
    </>
  );
  const footPanel = (
    <>
      <h2
        className="w-full cursor-pointer flex justify-center rutgon text-[red] opacity-[0.7]"
        onClick={() => {
          const xuathien: any = document.querySelector(".xuathien");
          const rutgon: any = document.querySelector(".rutgon");
          if (xuathien) {
            rutgon.textContent = "Xem thêm";
          } else {
            rutgon.textContent = "Rút gọn";
          }
          ref.current.toggle();
        }}
      >
        {xuathien ? "Xem thêm" : "Rút gọn"}
      </h2>
    </>
  );
  return (
    <>
      <Panel
        className="panelContent"
        footer={footPanel}
        ref={ref}
        header={headerPanel}
        toggleable
      >
        <div className="m-0 xuathien">
          <p>
            <span className="font-[700]">Thời trang nam cao cấp</span> Merriman
            là một thương hiệu với 11 năm kinh nghiệm trên thị trường thời trang
            cao cấp dành cho nam. Nhắc đến Merriman, người ta sẽ nghĩ ngay đến
            một người đàn ông lịch lãm trong bộ suit chỉn chu, sang trọng. Thế
            nhưng ít ai biết rằng, Merriman còn là một cái tên quen thuộc chuyên
            cung cấp sản phẩm áo{" "}
            <span className="font-[700]">thun nam cao cấp</span>, áo polo nam
            cao cấp.
          </p>
          <p>
            Hiện nay không khó để bắt gặp một người đàn ông, từ thanh niên đến
            trung niên diện áo thun nam, đặc biệt là{" "}
            <span className="font-[700]">áo thun có cổ nam</span> này trong cuộc
            sống thường nhật bởi tính thoải mái nhưng vẫn không kém phần lịch
            sự.
          </p>
          <p>
            Có rất nhiều thương hiệu trên thị trường Việt Nam cung cấp mặt hàng
            áo thun nam, <span className="font-[700]">áo polo nam cao cấp</span>
            , thế nhưng ở Merriman bạn dễ dàng chọn được cho mình một mẫu áo ưng
            ý với hàng loạt những thiết kế sáng tạo, lịch lãm được tư vấn bởi
            đội ngũ bán hàng am hiểu thời trang và luôn đặt khách hàng làm trọng
            tâm trong phong cách phục vụ của mình.
          </p>
          <p className="font-[700]">
            <i className="pi pi-angle-double-right"></i>
            Xem thêm:{" "}
            <span className="text-[#e67e22]">Cách chọn áo thun nam</span> phù
            hợp với dáng người chuẩn đẹp
          </p>
          <div className="mt-1 flex justify-center">
            <Image src={img1.src} alt="Image" width="350" />
          </div>
          <p className="mt-3">
            Ở Merriman, khách hàng của chúng tôi hoàn toàn yên tâm về chất lượng
            sản phẩm với bề dày lịch sử hơn 50 năm hoạt động trong ngành dệt may
            của công ty mẹ Hòa Thọ. Bất kì một yêu cầu đặc biệt nào của khách
            hàng Merriman cũng tự tin đáp ứng được, về chất liệu vải, về hoạ
            tiết hình in hay thậm chí về mã màu đặc thù.
          </p>
          <p>
            Merriman đảm bảo sản phẩm đến với khách hàng trong tình trạng tốt
            nhất, đồng thời luôn thực hiện lấy ý kiến thăm dò khách hàng về mức
            độ hài lòng đối với sản phẩm và dịch vụ để không ngừng cải tiến chất
            lượng cũng như các chương trình tri ân dành cho khách hàng. Với 5
            tiêu chuẩn vàng mà công ty đặt ra như cung cấp sản phẩm và dịch vụ
            đáng tin cậy, đáp ứng nhiệt tình nhu cầu khách hàng, thành thạo về
            tư vấn thời trang, luôn đồng cảm với khách hàng và trân trọng cảm ơn
            khách hàng thì Merriman không chỉ đảm bảo chữ “tín”, làm hài lòng
            khách hàng mà còn thể hiện sự vượt trội so với đối thủ.
          </p>
          <p>
            Với mỗi chiếc <span className="font-[700]">áo thun cao cấp</span>{" "}
            được sản xuất tại Merriman là cả một quá trình chỉn chu từ tất cả
            các khâu, từ lựa chọn chất liệu vải, màu sắc, thiết kế, đến khâu may
            các bộ phận và ráp lại thành phẩm, tất cả đều dựa trên những tiêu
            chuẩn khắt khe nhất nhằm đem lại sản phẩm hoàn hảo đến từng đường
            kim mũi chỉ cho khách hàng.
          </p>
          <p className="font-[700]">
            <i className="pi pi-angle-double-right"></i>
            Xem thêm: Khám phá 50+
            <span className="text-[#e67e22]">mẫu quần short nam</span> phối cùng
            áo thun trẻ trung
          </p>
          <p className="font-[700] text-[18px]">
            Chất vải của áo thun dành cho nam tại Merriman
          </p>
          <p className="mt-3">
            Sản phẩm{" "}
            <span className="font-[700]">
              áo thun có cổ nam, áo thun polo nam, áo thun ngắn tay
            </span>{" "}
            được Merriman nghiên cứu kỹ lưỡng, chọn lựa chất vải cao cấp, đa
            dạng như
            <span className="font-[700]">áo thun sợi cà phê</span>,
            microfiber,...giúp chiếc áo vừa thoáng mát vừa thấm hút nhanh. Ngoài
            ra còn không bị bết dính khi người mặc vận động nhiều, giúp người
            mặc luôn thoải mái trong mọi hoạt động.{" "}
          </p>
          <p>
            Kiểu dáng đa dạng, họa tiết độc đáo cùng màu sắc nhã nhặn giúp tốt
            lên vẻ năng động, nam tính nhưng không kém phần lịch thiệp cho người
            mặc. Thích hợp sử dụng trong mọi hoàn cảnh dù là chốn công sở hay
            lúc đi chơi dạo phố. Sản phẩm chắc chắn sẽ mang lại làn gió mới
            trong tủ đồ của cánh mày râu.
          </p>
          <div className="mt-1 flex justify-center">
            <Image src={img2.src} alt="Image" width="350" />
          </div>
          <p className="mt-3">
            Với những ưu điểm vượt trội của mình, áo thun nam cao cấp Merriman
            chắc chắn sẽ khiến bạn yêu thích ngay từ cái nhìn đầu tiên.
          </p>
          <p>
            Còn chần chừ gì mà không xem ngay những mẫu áo thun polo, áo thun
            thể thao đẹp nhất đang sẵn có tại hệ thống Merriman.{" "}
          </p>
          <div className="flex justify-center align-items-center mt-4">
            <div className="cursor-pointer flex justify-around align-items-center h-[100px] w-[300px] rounded-[50px] bg-[#F38229]">
              <i className="pi pi-shopping-cart text-[25px] text-[#fff] giohang"></i>
              <p className="text-[35px] font-[700] text-[#fff]">Mua Ngay</p>
            </div>
          </div>
          <p className="mt-4 flex align-items-center">
            <i className="pi pi-angle-double-right sangphai mr-2"></i>
            Xem chi tiết sản phẩm: https://merriman.com.vn/collections/san-pham
          </p>
          <p className="mt-1 flex align-items-center">
            <i className="pi pi-angle-double-right sangphai mr-2"></i>
            Xem Hệ thống cửa hàng:
            https://merriman.com.vn/pages/he-thong-cua-hang-merriman
          </p>
          <p className="mt-5">-------------------------------</p>
          <p className="font-[700] text-[15px]">
            THƯƠNG HIỆU THỜI TRANG NAM MERRIMAN
          </p>
          <p>
            Địa chỉ: 36 Ông Ích Đường, Phường Hòa Thọ Đông, Quận Cẩm Lệ, Thành
            Phố Đà Nẵng, Việt Nam
          </p>
          <p>Giấy Chứng nhận ĐKKD số 0400101556 do Sở KHĐT TP Đà Nẵng cấp.</p>
          <p>
            <span className="font-[700] text-[15px]">LIÊN HỆ LÀM ĐẠI LÝ:</span>{" "}
            1800 1760
          </p>
          <p>#######</p>
        </div>
      </Panel>
    </>
  );
};
export default ContentFoot;
