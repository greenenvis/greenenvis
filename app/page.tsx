function MovingCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const datedItems = [
    { date: "08/04/2026", text: items[0] || "" },
    { date: "18/03/2026", text: items[1] || "" },
    { date: "17/03/2026", text: items[2] || "" },
    { date: "13/02/2026", text: items[3] || "" },
    { date: "04/02/2026", text: items[4] || "" },
    { date: "21/01/2026", text: items[5] || "" },
  ];

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #dbe3ea",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#0b5a8a",
          color: "white",
          padding: "14px 18px",
          fontWeight: "700",
          fontSize: "16px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          height: "340px",
          overflow: "hidden",
          padding: "14px",
          background: "#f8fafc",
        }}
      >
        <marquee
          direction="up"
          scrollAmount="2"
          style={{
            height: "320px",
          }}
        >
          {datedItems.map((item, i) => (
            <div
              key={i}
              style={{
                background: "#ffffff",
                border: "1px solid #dbe3ea",
                marginBottom: "14px",
                padding: "14px",
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: "#2ca02c",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontWeight: "700",
                  fontSize: "13px",
                  marginBottom: "10px",
                }}
              >
                📅 {item.date}
              </div>

              <div
                style={{
                  fontSize: "14px",
                  color: "#334155",
                  fontWeight: "500",
                  lineHeight: "1.6",
                }}
              >
                {item.text}
              </div>
            </div>
          ))}
        </marquee>
      </div>
    </div>
  );
}