import { Droppable } from "@hello-pangea/dnd";
import Command from "../KanbanList/Command";

export default function Columns({ title, tasks, id, color, icon }) {
  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: "#f4f5f7",
          borderRadius: "8px",
          width: "500px",
          height: "805px",
          overflowY: "scroll",
          scrollbarWidth: "none",
          padding: "8px",
        }}
      >
        <h3
          className="title"
          style={{
            padding: "15px",
            textAlign: "center",
            margin: "0",
            marginBottom: "7px",
            backgroundColor: `${color}`,
            color: "#fff",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {title} {icon}
        </h3>

        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              className="TaskList"
              style={{
                padding: "3px",
                transition: "black 0.2 ease",
                backgroundColor: "#f4f5f7",
                flexGrow: 1,
                minHeight: "100px",
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {tasks &&
                tasks.map((task, index) => (
                  <Command key={index} index={index} task={task} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}
