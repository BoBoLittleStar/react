import moment from "moment";
const _format = "YYYY-MM-DD HH:mm:ss";
export function now() {
	return moment().format(_format);
}