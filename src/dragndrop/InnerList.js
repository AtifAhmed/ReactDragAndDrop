import React from "react";
import Task from "./Task";

const InnerList = React.memo(function InnerList({ tasks }) {
  return tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} />
  ));
});
export default InnerList;
