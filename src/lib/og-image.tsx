import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function createOgImage({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #09090b 0%, #1c1010 50%, #09090b 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#ce422b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            🦀
          </div>
          <span style={{ fontSize: "28px", fontWeight: 600, color: "#f0745a" }}>
            Borrowed &amp; Owned
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {badge && (
            <span
              style={{
                alignSelf: "flex-start",
                padding: "8px 20px",
                borderRadius: "999px",
                background: "rgba(206, 66, 43, 0.2)",
                color: "#f0745a",
                fontSize: "22px",
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {badge}
            </span>
          )}
          <div
            style={{
              fontSize: title.length > 40 ? "52px" : "64px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.4,
              color: "#a1a1aa",
              maxWidth: "800px",
            }}
          >
            {subtitle.length > 120 ? `${subtitle.slice(0, 117)}...` : subtitle}
          </div>
        </div>

        <div style={{ fontSize: "22px", color: "#71717a" }}>
          Curated Rust learning resources
        </div>
      </div>
    ),
    ogSize,
  );
}
