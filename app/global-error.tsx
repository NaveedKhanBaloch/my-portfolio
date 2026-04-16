"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="auth-page">
          <div className="auth-card">
            <p className="eyebrow">Application error</p>
            <h1>The app needs a fresh reload.</h1>
            <p>{error.message || "A global rendering error occurred."}</p>
            <button className="button button-primary" type="button" onClick={() => reset()}>
              Reload view
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
