import { createStore } from "redux";

function todos(state = [], action) {
	switch (action.type) {
		case "add":
			return state.concat([action.payload]);
		case "tick":
			return state.map(elem => elem["id"] === action.payload["id"] ? {...elem, "checked": true, "date modified": action.payload["date modified"]} : elem);
		case "edit":
			return state.map(elem => elem["id"] === action.payload["id"] ? {...elem, "task": action.payload["task"], "date modified": action.payload["date modified"]} : elem);
		case "remove":
			return state.filter(elem => elem["id"] !== action.payload["id"]);
		default:
			return state;
	}
}

export default createStore(todos);