// import axios from 'axios';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "./actions";
import "./App.css";

// const addr = "http://localhost:8080/todo";

let id = 1;

function App() {
	const [by, setBy] = useState(null);
	const [items, dispatch] = [useSelector(render), useDispatch()];

	function render(items) {
		if (by)
			items.sort((o1, o2) => o1[by] === o2[by] ? o1["id"] - o2["id"] : o1[by] > o2[by]);
		return items.map(elem =>
			<tr key={elem["id"]}>
						<td onClick={() => dispatch(actions.remove(elem["id"]))}>❌</td>
						<td>{elem["id"]}</td>
						<td onClick={(e) => {
							if (e.button === 0) {
								let task = prompt("Edit task:")
								if (task && (task = task.trim()) !== "")
									dispatch(actions.edit(elem["id"], task));
							}
						}}>{elem["task"]}</td>
						<td onClick={() => dispatch(actions.tick(elem["id"]))}>{elem["checked"] ? "✅" : "❎"}</td>
						<td>{elem["date added"]}</td>
						<td>{elem["date modified"]}</td>
					</tr>
		);
	}

	function sort(b) {
		if (by !== b)
			setBy(b);
	}

	const input = <input type="text"
	                     style={{
		                     width: "calc(100% - 10px)",
		                     textAlign: "center"
	                     }}
	                     placeholder="Insert todo task"
	                     onKeyDown={(e) => {
		                     let task;
		                     if (e.key === "Enter" && (task = e.target.value)) {
			                     if ((task = task.trim()) !== "")
				                     dispatch(actions.add(id++, task));
			                     e.target.value = "";
		                     }
	                     }} />;

	return <div className="App">
		<h1>Todo Tasks</h1>
		<table style={{borderCollapse: "collapse", margin: "auto"}}>
			<thead>
				<tr>
					<th colSpan="6">{input}</th>
				</tr>
				<tr>
					<th>❌</th>
					<th onClick={() => sort("id")}>Id</th>
					<th onClick={() => sort("task")}>Tasks</th>
					<th onClick={() => sort("checked")}>Checked</th>
					<th onClick={() => sort("date added")}>Date Added</th>
					<th onClick={() => sort("date modified")}>Date Modified</th>
				</tr>
			</thead>
			<tbody>
				{items}
			</tbody>
		</table>
	</div>;
}

export default App;
