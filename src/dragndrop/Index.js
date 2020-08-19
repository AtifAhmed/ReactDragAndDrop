import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { connect } from "react-redux";
import * as actions from "redux/actions";

const Index = ({ allTasks, columnOrder, columns, dispatchUpdateOrder }) => {
  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.color = "inherit";
    const { destination, source, draggableId } = result;
    if (!destination) {
      // no destination!!! no need to do anything
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // check if position is changed after dragged
      return;
    }

    const column = columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
    let orderedColums = {
      ...columns,
      [newColumn.id]: newColumn,
    };
    dispatchUpdateOrder(orderedColums);

    document.getElementsByClassName("App-header")[0].style.backgroundColor =
      "#282c34";
  };
  const onDragStart = () => {
    //examples onDragstart
    console.log("Drag Start....");
    document.getElementsByClassName("App-header")[0].style.backgroundColor =
      "orange";
  };
  const onDragUpdate = (update) => {
    //     //examples onDragUpdate
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    console.log("Drag Update....");
    const { destination } = update;
    document.getElementsByClassName(
      "App-header"
    )[0].style.backgroundColor = randomColor;
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      {columnOrder.map((columnId) => {
        const column = columns[columnId];
        const tasks = column.taskIds.map((taskId) => allTasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

function mapStateToProps(state) {
  return {
    allTasks: state.dragndrop.tasks,
    columns: state.dragndrop.columns,
    columnOrder: state.dragndrop.columnOrder,
  };
}
const mapDispatchToProps = {
  dispatchUpdateOrder: actions.updateOrder,
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
