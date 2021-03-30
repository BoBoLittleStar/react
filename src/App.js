// import axios from 'axios';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import actions from "./actions";
import "./App.css";

// const addr = "http://localhost:8080/todo";

let id = 0;

function App() {
	const [by, setBy] = useState(null);
	const [reverse, setReverse] = useState(false);
	const [selected, setId] = useState({});
	const [filter, setFilter] = useState("");
	const [items, dispatch] = [useSelector(render), useDispatch()];

	function render(items) {
		if (by) {
			items.sort((o1, o2) => o1[by] === o2[by] ? o1["id"] - o2["id"] : o1[by] > o2[by]);
			if (reverse)
				items.reverse();
		}
		if (filter)
			items = items.filter(elem => elem["task"].includes(filter));
		items = items.map(row);
		return items;
	}

	function sort(b) {
		if (by !== b) {
			setBy(b);
			setReverse(false);
		} else
			setReverse(r => !r);
	}

	function select(id) {
		setId(ids => {
			let k = {...ids};
			k[id] = !k[id];
			return k;
		});
	}

	function inverse() {
		setId(ids => {
			let k = {...ids};
			for (let id in k)
				k[id] = !k[id];
			return k;
		})
	}

	function Input() {
		return <input type="text"
		              style={{
			              width: "calc(100% - 10px)",
			              textAlign: "center"
		              }}
		              autoFocus={true}
		              placeholder="Insert todo task"
		              onKeyDown={(e) => {
			              let task;
			              if (e.key === "Enter") {
				              if ((task = e.target.value.trim())) {
					              id++;
					              setId(ids => {
						              let k = {...ids};
						              k[id] = false;
						              return k;
					              })
					              dispatch(actions.add(id, task));
				              }
				              e.target.value = "";
			              }
		              }} />;
	}

	function row(elem) {
		return <tr key={elem["id"]}>
						<td><input type="checkbox" checked={selected[elem["id"]]} onChange={() => select(elem["id"])} /></td>
						<td>{elem["id"]}</td>
						<td onClick={(e) => {
							if (e.button === 0) {
								let task = prompt("Edit task:")
								if (task && (task = task.trim()) !== "")
									dispatch(actions.edit(elem["id"], task));
							}
						}}>{elem["task"]}</td>
						<td>
							<span style={{color: elem["checked"] ? "green" : "red"}} onClick={() => dispatch(actions.tick(elem["id"]))}>
								{elem["checked"] ? "✔" : "✖"}
							</span>
						</td>
						<td>{elem["date added"]}</td>
						<td>{elem["date modified"]}</td>
					</tr>;
	}

	function Filter() {
		return <input type="text"
		              defaultValue={filter}
		              style={{width: "calc(100% - 10px)"}}
		              placeholder="filter"
		              onKeyDown={(e) => {
			              if (e.key === "Enter")
				              setFilter(e.target.value.trim());
		              }} />
	}

	return <div className="App">
		<h1>Todo Tasks</h1>
		<table style={{borderCollapse: "collapse", margin: "auto"}}>
			<thead>
				<tr style={{position: "sticky", top: 0}}>
					<th colSpan="6"><Input /></th>
				</tr>
				<tr>
					<th style={{width: "20px"}}><input type="button" onClick={() => inverse()} /></th>
					<th style={{width: "80px"}} onClick={() => sort("id")}>Id</th>
					<th style={{width: "500px"}} onClick={() => sort("task")}>Tasks</th>
					<th style={{width: "150px"}} onClick={() => sort("checked")}>Checked</th>
					<th style={{width: "300px"}} onClick={() => sort("date added")}>Date Added</th>
					<th style={{width: "300px"}} onClick={() => sort("date modified")}>Date Modified</th>
				</tr>
				<tr>
					<td style={{cursor: "pointer"}} onClick={() => dispatch(actions.remove(selected))}>❌</td>
					<td></td>
					<td>
						<Filter />
					</td>
				</tr>
			</thead>
			<tbody>
				{items}
			</tbody>
		</table>
	</div>;
}

export default App;
