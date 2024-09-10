import dayjs from "dayjs"
import utc from "dayjs/plugin/utc";

export const formateDate = (date: string, format: string = "MMMM DD, YYYY") => {
    dayjs.extend(utc);
    return dayjs.utc(date).format(format);
}