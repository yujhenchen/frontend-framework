// import { h, hFragment } from "../src/h";

// interface State {
//     todo: Array<string>,
//     editingIndexes: Set<number>
// };

// const state = {
//     todo: ["Wash a cat", "Get an apple"],
//     editingIndexes: new Set([0, 1])
// };

// function App() {
//     return hFragment([
//         h("h1", {}, ["My TODOs"]),
//         CreateTodo(state),
//         TodoList(state)
//     ]);
// }

// function CreateTodo(state: State) {
//     return h("div", {}, [
//         h("input", {}, [ null ]),
//         h("button", {}, [ "Add Todo" ]),
//     ]);
// }

// function TodoList(state: State) {
//     const children = state.todo.map(
//         (todo, index) => TodoItem(todo, index, state.editingIndexes));
//     return h("ul", {}, children);
// }

// function TodoItem(todo: string, indexInList: number, editingIndexes: Set<number>) {
//     const isEditing = editingIndexes.has(indexInList);
//     return h("li", {}, [isEditing ? TodoInEditMode(todo, indexInList) : TodoInReadMode(todo, indexInList)]);
// }

// function TodoInEditMode(todo: string, indexInList: number) {
//     return h("div", {}, [
//         h("input", {}, [ todo ]),
//         h("button", {}, [ "Save" ]),
//         h("button", {}, [ "Cancel" ]),
//     ]);
// }

// function TodoInReadMode(todo: string, indexInList: number) {
//     return hFragment([
//         h("span", {}, [ todo ]),
//         h("button", {}, ["Done"])
//     ]);
// }
