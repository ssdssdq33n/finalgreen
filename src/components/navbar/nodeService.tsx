export const nodeService = {
  getDanhMucSanPham() {
    return [
      {
        key: "0",
        label: "Áo nam",
        data: "Áo nam ",
        icon: "",
        children: [
          {
            key: "0-0",
            label: "Áo sơ mi nam công sở",
            data: "Áo sơ mi nam công sở ",
            icon: "pi pi-minus",
          },
          {
            key: "0-1",
            label: "Áo sơ mi casual",
            data: "Áo sơ mi casual",
            icon: "pi pi-minus",
          },
          {
            key: "0-2",
            label: "Áo sơ mi caro",
            data: "Áo sơ mi caro ",
            icon: "pi pi-minus",
          },
          {
            key: "0-3",
            label: "Áo sơ mi bamboo",
            data: "Áo sơ mi bamboo",
            icon: "pi pi-minus",
          },
          {
            key: "0-4",
            label: "Áo sơ mi trắng",
            data: "Áo sơ mi trắng ",
            icon: "pi pi-minus",
          },
          {
            key: "0-5",
            label: "Áo sơ mi laxury",
            data: "Áo sơ mi laxury ",
            icon: "pi pi-minus",
          },
          {
            key: "0-6",
            label: "Áo sơ mi cotton",
            data: "Áo sơ mi cotton ",
            icon: "pi pi-minus",
          },
        ],
      },
      {
        key: "1",
        label: "Quần nam",
        data: "Quần nam ",
        icon: "",
        children: [
          {
            key: "1-0",
            label: "Quần tây nam",
            icon: "pi pi-minus",
            data: "Quần tây nam",
          },
          {
            key: "1-1",
            label: "Quần kaki nam",
            icon: "pi pi-minus",
            data: "Quần kaki nam",
          },
          {
            key: "1-2",
            label: "Quần short nam",
            icon: "pi pi-minus",
            data: "Quần short nam",
          },
          {
            key: "1-3",
            label: "Quần jean nam",
            icon: "pi pi-minus",
            data: "Quần jean nam",
          },
        ],
      },
      {
        key: "2",
        label: "Veston nam",
        data: "Veston nam",
        icon: "",
        children: [
          {
            key: "2-0",
            label: "Áo vest và blazer",
            icon: "pi pi-minus",
            data: "Áo vest và blazer",
          },
          {
            key: "2-1",
            label: "Vest bộ",
            icon: "pi pi-minus",
            data: "Vest bộ",
          },
          {
            key: "2-2",
            label: "May đo veston",
            icon: "pi pi-minus",
            data: "May đo veston",
          },
        ],
      },
      {
        key: "3",
        label: "Phụ kiện",
        data: "Phụ kiện",
        icon: "",
        children: [
          {
            key: "3-0",
            label: "Phiếu quà tặng",
            icon: "pi pi-minus",
            data: "Phiếu quà tặng",
          },
          {
            key: "3-1",
            label: "Nịt lưng",
            icon: "pi pi-minus",
            data: "Nịt lưng",
          },
          {
            key: "3-2",
            label: "Ví da",
            icon: "pi pi-minus",
            data: "Ví da",
          },
          {
            key: "3-3",
            label: "Tất",
            icon: "pi pi-minus",
            data: "Tất",
          },
        ],
      },
    ];
  },
  getLoaiTui() {
    return [
      {
        key: "0",
        label: "Lọc giá",
        data: "Loại túi",
        icon: "pi pi-dollar",
        children: [
          {
            key: "0-0",
            label: "Dưới 300k",
            icon: "pi pi-minus",
            data: ["less", 300000],
          },
          {
            key: "0-1",
            label: "300k - 700k",
            icon: "pi pi-minus",
            data: [300000, 700000],
          },
          {
            key: "0-2",
            label: "700k - 1.000k",
            icon: "pi pi-minus",
            data: [700000, 1000000],
          },
          {
            key: "0-3",
            label: "Trên 1.000k",
            icon: "pi pi-minus",
            data: ["more", 1000000],
          },
        ],
      },
    ];
  },
  getHoaTiet() {
    return [
      {
        key: "0",
        label: "Họa tiết",
        data: "Họa tiết",
        icon: "pi pi-slack",
        children: [
          {
            key: "0-0",
            label: "Trơn",
            icon: "pi pi-minus",
            data: "Trơn",
          },
          {
            key: "0-1",
            label: "Họa tiết nhỏ",
            icon: "pi pi-minus",
            data: "Họa tiết nhỏ",
          },
          {
            key: "0-2",
            label: "Khác",
            icon: "pi pi-minus",
            data: "Khác",
          },
        ],
      },
    ];
  },
  getKichThuoc() {
    return [
      {
        key: "0",
        label: "Kích thước",
        data: "Kích thước",
        icon: "pi pi-sliders-h",
        children: [
          {
            key: "0-0",
            label: "S",
            icon: "pi pi-minus",
            data: "S",
          },
          {
            key: "0-1",
            label: "M",
            icon: "pi pi-minus",
            data: "M",
          },
          {
            key: "0-2",
            label: "L",
            icon: "pi pi-minus",
            data: "L",
          },
          {
            key: "0-3",
            label: "XL",
            icon: "pi pi-minus",
            data: "XL",
          },
          {
            key: "0-4",
            label: "2XL",
            icon: "pi pi-minus",
            data: "2XL",
          },
        ],
      },
    ];
  },
};
