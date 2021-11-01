import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
	constructor(id, title) {
		const topDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Column.createRoot();
		this.elements.columns = this.elements.root.querySelector(".kanban__column");
		this.elements.title = this.elements.root.querySelector(".kanban__column-title");
		this.elements.items = this.elements.root.querySelector(".kanban__column-items");
		this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");
		this.elements.addColumn = this.elements.root.querySelector(".kanban__add-column");

		this.elements.root.dataset.id = id;
		this.elements.title.textContent = title;
		this.elements.items.appendChild(topDropZone);

		this.elements.addItem.addEventListener("click", () => {
			const newItem = KanbanAPI.insertItem(id, "");

			this.renderItem(newItem);
		});

		this.elements.addColumn.addEventListener("click", () => {
			const newColumn = KanbanAPI.insertColumn();

			this.renderColumn(newColumn);
		});

		KanbanAPI.getItems(id).forEach(item => {
			this.renderItem(item);
		});
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="kanban__column">
				<div contenteditable class="kanban__column-title"></div>
				<div class="kanban__column-items"></div>
				<button class="kanban__add-item" type="button">+ Add</button>
				<button class="kanban__add-column" type="button">+Add column</button>
			</div>
		`).children[0];
	}

	renderItem(data) {
		const item = new Item(data.id, data.content);

		this.elements.items.appendChild(item.elements.root);
	}

	renderColumn(data) {
		const column = new Column(data.id, data.title);
		const container = document.querySelector(".kanban");
		container.appendChild(column.elements.root);
		//this.elements.columns.appendChild(column.elements.root);
	}
}