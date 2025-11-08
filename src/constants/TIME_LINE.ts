export type TimeLine = {
    message: string;
    start: number; // minues
    end: number; // minues
}

export const TIME_LINE: TimeLine[] = [
    {
        start: 0,
        end: 510,
        message: "Chưa có tới giờ làm việc bà cố nội ơi",
    },
    {
        start: 510,
        end: 1050,
        message: "Còn {{count}} phút nữa là đến 17h30",
    },
    {
        start: 1050,
        end: 1439,
        message: "Hãy relax sau 1 ngày làm việc mịt mủi"
    }
]