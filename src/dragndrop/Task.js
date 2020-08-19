import React, { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Card, CardBody, Input } from "reactstrap";
import { ReactComponent as IconEdit } from "assets/images/pen-edit.svg";
import { ReactComponent as IconDelete } from "assets/images/delete-trash.svg";
import { ReactComponent as IconCheck } from "assets/images/check.svg";
import { connect } from "react-redux";
import * as actions from "redux/actions";

const Container = styled.div`  
  margin-bottom: 8px;
  background-color: white;
  transition: background-color:0,2s ease;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

const Task = ({ index, task, dispatchEditTask, dispatchDeleteTask }) => {
  const [selectedId, setSelectedId] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const onEditClick = (selectedId) => {
    setSelectedId(selectedId);
  };
  const onSaveClick = (selectedId) => {
    dispatchEditTask(selectedId, inputValue);
    setSelectedId(0);
  };
  const onDeleteClick = (selectedId) => {
    dispatchDeleteTask(selectedId);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <Card className="d-flex flex-row align-items-center w-100">
            <CardBody
              style={{ flex: "1" }}
              className="d-flex flex-row align-items-center justify-content-between"
            >
              <div className="d-flex row w-100">
                {selectedId === 0 && <div className="">{task.content}</div>}
                {selectedId !== 0 && (
                  <div className="">
                    <Input
                      type="text"
                      name="task"
                      id={selectedId}
                      placeholder={task.content}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <div style={{ flex: "0" }} className="d-flex">
                {selectedId === 0 && (
                  <>
                    <IconDelete
                      title="delete"
                      className="icon icon-delete-trash mr-2"
                      onClick={() => onDeleteClick(task.id)}
                    />
                    <IconEdit
                      title="edit"
                      className="icon icon-pen-edit ml-2"
                      onClick={() => onEditClick(task.id)}
                    />
                  </>
                )}
                {selectedId !== 0 && (
                  <>
                    <IconCheck
                      title="save"
                      className="icon icon-check ml-2"
                      onClick={() => onSaveClick(task.id)}
                    />
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </Container>
      )}
    </Draggable>
  );
};

const mapDispatchToProps = {
  dispatchEditTask: actions.editTask,
  dispatchDeleteTask: actions.deleteTask,
};
export default connect(null, mapDispatchToProps)(Task);
