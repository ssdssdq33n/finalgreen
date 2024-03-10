"use client";
import LienHe from "@/components/lienhe/LienHe";
import "./hethong.css";
import React, { useEffect, useState } from "react";
import { REACT_APP_GOOGLE_MAPS_KEY } from "./contain";
import { nodeHeThong } from "./contain";
import { Dropdown } from "primereact/dropdown";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "500px",
};
const Hethongcuahang = () => {
  const [groupedCities, setGroupCity] = useState<any>([]);
  const [chinhanh, setChiNhanh] = useState<IKinhdo[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>({
    value: "",
    lat: 0,
    lng: 0,
  });
  const [query, setQuery] = useState<string>("");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(selectedLocation);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);
  useEffect(() => {
    setGroupCity(nodeHeThong.getCity());
    setChiNhanh(nodeHeThong.getDiachi());
  }, []);
  useEffect(() => {
    let nhanh = chinhanh.find((item) => item.value === query);
    setSelectedLocation(nhanh);
  }, [query]);
  return (
    <>
      <div className="mt-5 bg-[#fff] pb-5">
        <h2 className="mt-3 flex justify-center font-[700] text-[25px]">
          Hệ Thống Cửa Hàng Merriman
        </h2>
        <div className="grid flex mx-3 mt-3">
          <div className="col-4 border-1 border-gray-300 shadow-2xl">
            <div className="grid mt-2 mx-2">
              <h2 className=" flex font-[600] text-[20px]">Tìm cửa hàng</h2>
              <p className="mt-4 font-[600] opacity-[0.9]">Chọn của hàng :</p>
              <Dropdown
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                options={groupedCities}
                optionLabel="label"
                optionGroupLabel="label"
                optionGroupChildren="items"
                className="w-full mt-2 border-1 border-gray-400"
                placeholder="Chọn chi nhánh"
              />
              {query.length > 0 ? (
                <>
                  <h2 className="mt-4 font-[600] text-[18px] opacity-[0.8]">
                    <i className="pi pi-map-marker mr-2"></i>Đại lý Merriman tại
                    chi nhánh
                  </h2>
                  <p className="mt-2 ml-4">{query}</p>
                  <p className="mt-2 ml-4">
                    Thời gian hoạt động:{" "}
                    <span className="font-[600]">
                      8h00 - 21h00 (kể cả CN và ngày lễ)
                    </span>
                  </p>
                  <p className="mt-2 ml-4">
                    Điện thoại: <span className="font-[600]">0386131438</span>
                  </p>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="col-8 py-0">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedLocation}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                <MarkerF
                  position={selectedLocation}
                  icon={
                    "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                  }
                />
              </GoogleMap>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <LienHe />
    </>
  );
};
export default Hethongcuahang;
