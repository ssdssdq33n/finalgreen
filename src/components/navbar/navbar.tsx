"use client";
import { TreeSelect } from "primereact/treeselect";
import { Tree } from "primereact/tree";
import { useEffect, useState } from "react";
import { nodeService } from "./nodeService";
import "./navbar.css";
import { useRouter } from "next/navigation";
const Navbar = (props: any) => {
  const [options, setOptions] = useState<any>([]);
  const [options2, setOptions2] = useState<any>([]);
  const [options3, setOptions3] = useState<any>([]);
  const [options4, setOptions4] = useState<any>([]);
  useEffect(() => {
    setOptions(nodeService.getDanhMucSanPham());
    setOptions2(nodeService.getLoaiTui());
    setOptions3(nodeService.getHoaTiet());
    setOptions4(nodeService.getKichThuoc);
  }, []);
  const { setDataPrice, setDataPriceCate } = props;
  const router = useRouter();
  const handleClick = (e: any) => {
    setDataPrice(e.node.data);
  };
  return (
    <div className="">
      <Tree
        selectionMode="single"
        value={options}
        className="w-full shadow-1 danhmuc"
        filter
        filterMode="lenient"
        filterPlaceholder="Danh mục sản phẩm"
        onNodeClick={(e) => {
          // router.push(`/collections/${encodeURIComponent(e.node.data)}`);
          setDataPriceCate(e.node.data);
        }}
      />
      <Tree
        value={options2}
        selectionMode="single"
        className="w-full mt-3 shadow-1"
        onNodeClick={handleClick}
      />
      <Tree
        value={options3}
        selectionMode="single"
        className="w-full mt-3 shadow-1"
      />
      <Tree
        value={options4}
        selectionMode="single"
        className="w-full mt-3 shadow-1"
      />
    </div>
  );
};
export default Navbar;
