"use client";

import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
          <h2>Something went wrong!</h2>
          {reset && (
            <button
              onClick={() => reset()}
              style={{ padding: "0.5rem 1rem", borderRadius: "9999px", background: "#fff", color: "#000", border: "none", cursor: "pointer" }}
            >
              Try again
            </button>
          )}
        </div>
      </body>
    </html>
  );
}
