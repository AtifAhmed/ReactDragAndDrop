import * as actiontypes from "../constants";

const initialState = {
  tasks: {
    "task-1": { id: "task-1", content: "Task List 1" },
    "task-2": { id: "task-2", content: "Task List 2" },
    "task-3": { id: "task-3", content: "Task List 3" },
    "task-4": { id: "task-4", content: "Task List 4" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};
function dragndrop(state = initialState, action) {
  switch (action.type) {
    case actiontypes.EDIT_TASKS: {
      let allTasks = state.tasks;
      allTasks[action.selectedId].content = action.inputValue;
      return {
        ...state,
        tasks: allTasks,
      };
    }
    case actiontypes.UPDATE_ORDER: {
      return {
        ...state,
        columns: action.columns,
      };
    }
    case actiontypes.DELETE_TASK: {
      const column = state.columns["column-1"];
      const newTaskIds = Array.from(column.taskIds);
      const indexOfItemToDelete = newTaskIds.indexOf(action.selectedId);
      newTaskIds.splice(indexOfItemToDelete, 1);
      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };
      let orderedColums = {
        ...state.columns,
        ["column-1"]: newColumn,
      };
      return {
        ...state,
        columns: orderedColums,
      };
    }
    default:
      return state;
  }
}

export default dragndrop;
