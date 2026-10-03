import { ImageResponse } from "next/og";

export const alt =
  "Atlas Solutions — Software, Datos y Automatización en Chile";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080808",
          color: "#f4f3ef",
          padding: "70px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.18em",
          }}
        >
          ATLAS SOLUTIONS
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
          }}
        >
          <div>CONSTRUIMOS</div>
          <div>SISTEMAS QUE</div>
          <div>FUNCIONAN.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            opacity: 0.7,
          }}
        >
          <div>SOFTWARE · DATOS · AUTOMATIZACIÓN</div>
          <div>CHILE</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
