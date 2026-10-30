export type HolyDay = {
    day: number,
    month: number,
    name: string
}

export const REPEAT_HOLYDAYS: HolyDay[] = [
    {
        day: 1,
        month: 0,
        name: "Tết dương lịch",
    },
    {
        day: 14,
        month: 1,
        name: "Lễ tình nhân (Vallentine) 14/2",
    },
    {
        day: 3,
        month: 1,
        name: "Ngày thành lập Đảng Cộng Sản Việt Nam 3/2",
    },
    {
        day: 8,
        month: 2,
        name: "Ngày quốc tế phụ nữ 8/3",
    },
    {
        day: 26,
        month: 2,
        name: "Ngày thành lập đoàn thanh niên Cộng Sản Hồ Chí Minh 26/3",
    },
    {
        day: 30,
        month: 3,
        name: "Ngày giải phóng miền Nam thống nhất đất nước",
    },
    {
        day: 1,
        month: 4,
        name: "Quốc tế lao động",
    },
    {
        day: 1,
        month: 5,
        name: "Quốc tế thiếu nhi",
    },
    {
        day: 27,
        month: 6,
        name: "Ngày thương binh liệt sỹ 27/7",
    },
    {
        day: 2,
        month: 8,
        name: "Quốc khánh 2/9",
    },
    {
        day: 20,
        month: 9,
        name: "Ngày phụ nữ Việt Nam 20/10",
    },
    {
        day: 31,
        month: 9,
        name: "Haloween",
    },
    {
        day: 20,
        month: 10,
        name: "Ngày nhà giáo Việt Nam 20/11",
    },
    {
        day: 24,
        month: 10,
        name: "Ngày văn hóa Việt Nam",
    },
    {
        day: 25,
        month: 11,
        name: "Giáng sinh",
    },
]

export const LUNAR_HOLIDAYS: HolyDay[] = [
  { name: "Giỗ tổ Hùng Vương mùng 10 tháng 3", day: 10, month: 3 },
  { name: "Lễ Vu Lan", day: 15, month: 7 },
  { name: "Tết Trung Thu", day: 15, month: 8 },
  { name: "Ngày cúng đưa Ông Công Ông Táo", day: 23, month: 12 },
];