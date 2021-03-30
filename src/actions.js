import {now} from "./constants";

function add(id, task) {
	let n = now();
	return {
		type: "add",
		payload: {
			"id": id,
			"task": task,
			"checked": false,
			"date added": n,
			"date modified": n
		}
	};
}

function edit(id, task) {
	return {
		type: "edit",
		payload: {
			"id": id,
			"task": task,
			"date modified": now()
		}
	};
}

function tick(id) {
	return {
		type: "tick",
		payload: {
			"id": id,
			"date modified": now()
		}
	};
}

function remove(ids) {
	return {
		type: "remove",
		payload: {
			"ids": ids
		}
	};
}

const actions = {"add": add, "edit": edit, "remove": remove, "tick": tick};
export default actions;