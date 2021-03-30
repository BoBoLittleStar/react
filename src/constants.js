import moment from "moment";
export function now() {
	const format = "YYYY-MM-DD HH:mm:ss";
	return moment().format(format);
}