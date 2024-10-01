import { Draggable } from "@hello-pangea/dnd";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
                padding: "0.8rem",
                backgroundColor: "#eeebeb",
                borderRadius: "5px",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  display: "flex",

                  justifyContent: "space-between",
                }}
              >
                <h3>#{task.id}</h3>

                <div
                  style={{
                    fontWeight: "bold",
                    fontFamily: "Electrolize",
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  18:00
                  <AccessTimeIcon style={{ width: "1rem" }} />
                </div>
              </span>
              <p>{task.title}</p>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    </>
  );
}
