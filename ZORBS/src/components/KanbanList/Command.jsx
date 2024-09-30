import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Draggable } from "@hello-pangea/dnd";

export default function Command({ task, index }) {
  return (
    <>
      <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            className="container"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                padding: 2,
                backgroundColor: "#D9D9D9",
                borderRadius: "5px",
                marginBottom: "6px",
              }}
            >
              <span>
                <small>#{task.id}</small>
              </span>
              <h3>{task.title}</h3>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </>
  );
}
