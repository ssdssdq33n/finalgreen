export const REACT_APP_GOOGLE_MAPS_KEY: string =
  "AIzaSyBqMhMNh-udZQ4ikfqx9qbFchxQYkrRTaI";

export const nodeHeThong = {
  getCity() {
    return [
      {
        label: "Hà Nội",
        code: "HN",
        items: [
          { label: "Đông Anh", value: "73 Cao Lỗ, Thị trấn Đông Anh, Hà Nội" },
          {
            label: "Bắc Từ Liêm",
            value:
              "TTTM Vincom Bắc Từ Liêm, 234 Phạm Văn Đồng, P.Cổ Nhuế, Q.Bắc Từ Liêm, Hà Nội",
          },
          {
            label: "Hai Bà Trưng",
            value: "67 Ngô Thì Nhậm, P. Ngô Thì Nhậm, Q. Hai Bà Trưng, Hà Nội",
          },
          {
            label: "Hoàn Kiếm",
            value: "Tầng 1, số 25 Bà Triệu, Quận Hoàn Kiếm, Hà Nội",
          },
        ],
      },
      {
        label: "Bắc Giang",
        code: "BG",
        items: [
          {
            label: "Bắc Giang",
            value: "150 Hoàng Văn Thụ, TP Bắc Giang, tỉnh Bắc Giang",
          },
        ],
      },
      {
        label: "Thừa Thiên Huế",
        code: "TTH",
        items: [
          { label: "Huế", value: "113 Trần Hưng Đạo, TP Huế" },
          {
            label: "Hương Thủy",
            value:
              "122 Dương Thiệu Tước, P. Thủy Dương, TX. Hương Thuỷ, Tỉnh Thừa Thiên Huế",
          },
        ],
      },
      {
        label: "Ninh Bình",
        code: "NB",
        items: [
          {
            label: "Kim Sơn",
            value:
              "54 Phố Phát Diệm Đông,thị trấn Phát Diệm, huyện Kim Sơn, Ninh Bình",
          },
          {
            label: "Nho Quan",
            value:
              "Phố Tân Nhất , Thị trấn Nho Quan, huyện Nho Quan , Tỉnh Ninh Bình",
          },
        ],
      },
    ];
  },
  getDiachi() {
    return [
      {
        value: "73 Cao Lỗ, Thị trấn Đông Anh, Hà Nội",
        lat: 21.140632,
        lng: 105.848878,
      },
      {
        value:
          "TTTM Vincom Bắc Từ Liêm, 234 Phạm Văn Đồng, P.Cổ Nhuế, Q.Bắc Từ Liêm, Hà Nội",
        lat: 21.052692954819367,
        lng: 105.78070752417091,
      },
      {
        value: "67 Ngô Thì Nhậm, P. Ngô Thì Nhậm, Q. Hai Bà Trưng, Hà Nội",
        lat: 21.01664241046751,
        lng: 105.85324560555966,
      },
      {
        value: "Tầng 1, số 25 Bà Triệu, Quận Hoàn Kiếm, Hà Nội",
        lat: 21.025390826000386,
        lng: 105.8527899208541,
      },
      {
        value: "150 Hoàng Văn Thụ, TP Bắc Giang, tỉnh Bắc Giang",
        lat: 21.27943293048844,
        lng: 106.20481442086745,
      },
      {
        value: "113 Trần Hưng Đạo, TP Huế",
        lat: 16.470283356415266,
        lng: 107.58634996297194,
      },
      {
        value:
          "122 Dương Thiệu Tước, P. Thủy Dương, TX. Hương Thuỷ, Tỉnh Thừa Thiên Huế",
        lat: 16.443796054450708,
        lng: 107.61405400530069,
      },
      {
        value:
          "54 Phố Phát Diệm Đông,thị trấn Phát Diệm, huyện Kim Sơn, Ninh Bình",
        lat: 20.091856672008962,
        lng: 106.08053176313652,
      },
      {
        value:
          "Phố Tân Nhất , Thị trấn Nho Quan, huyện Nho Quan , Tỉnh Ninh Bình",
        lat: 20.317656919998164,
        lng: 105.75116684374254,
      },
    ];
  },
};
