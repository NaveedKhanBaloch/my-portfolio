"use client";

export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Something went wrong</p>
        <h1>We hit an unexpected error.</h1>
        <p>{error.message || "Please try refreshing the page."}</p>
        <button className="button button-primary" type="button" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  );
}
