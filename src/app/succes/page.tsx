"use client";
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import '../succes/succes.css';
import { useRouter } from 'next/navigation';
const Succes = () =>{
    const router = useRouter();
    return(
        <>
            <div className="tong z-5 fixed bottom-0 top-0  left-0 right-0 bg-[#fff]">
                <div className="tren pb-[4%]">
                    <i className="pi pi-check-circle text-[50px]" style={{ color: 'green' }}></i>
                    <h1 className='text-[35px] pt-[10px] pb-[20px]'>Đặt hàng thành công !</h1>
                    <p className='text-[20px]'>Chúng tôi sẽ liên hệ Quý khách để xác nhận đơn hàng trong thời gian sớm nhất !</p>
                </div>
                <div className='duoi flex justify-content-center w-full'>
                    <div className="card justify-content-center w-full">
                        <Button label="Tiếp tục mua hàng" className='w-[15%] h-3rem bg-[#FF8C00] text-[#fff] text-[20px]' onClick={()=>router.push("/")}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Succes;