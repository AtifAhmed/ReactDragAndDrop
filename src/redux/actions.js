import { EDIT_TASKS, DELETE_TASK, UPDATE_ORDER } from "./constants";

export function editTask(selectedId, inputValue) {
  return {
    type: EDIT_TASKS,
    selectedId,
    inputValue,
  };
}
export function deleteTask(selectedId) {
  return {
    type: DELETE_TASK,
    selectedId,
  };
}
export function updateOrder(columns) {
  return {
    type: UPDATE_ORDER,
    columns,
  };
}
