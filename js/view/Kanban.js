import Column from "./Column.js";
import KanbanAPI from "../api/KanbanAPI.js";

export default class Kanban {
	constructor(root) {
		this.root = root;

		Kanban.columns().forEach(column => {
			const columnView = new Column(column.id, column.title);

			this.root.appendChild(columnView.elements.root);
		});
	}

	static columns() {
		if("id" in localStorage){
			return localStorage.getItem();	
		}
		else{
			return [
				{
					id: 1,
					title: "new"
				}
			];
		}
	}
}