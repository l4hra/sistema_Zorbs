export default function CommandCard({
  title,
  color,
  number,
  icon,
  subColor,
  qtdPedidos,
}) {
  return (
    <>
      <div
        className="commandCard"
        style={{
          backgroundColor: `${color}`,
          width: "30%",
          borderRadius: "5px",
          height: "255px",
          display: "flex",
          justifyContent: "center",
          color: "#fff",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>{title}</h2>
        <span
          style={{
            backgroundColor: `${subColor}`,
            borderRadius: "50px",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </span>
        <h3 style={{ marginBottom: 0 }}>{number}</h3>
        <h5 style={{ marginTop: 0 }}>{qtdPedidos}</h5>
      </div>
    </>
  );
}
