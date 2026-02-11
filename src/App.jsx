import { useState } from "react";

export default function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError(false);
    setJoke(null);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) {
        throw new Error("Fetch failed");
      }

      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
      <div
        style={{
          width: "420px",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h1>Random Joke</h1>
        <p>Click the button to fetch a fresh one.</p>

        <button onClick={fetchJoke} disabled={loading}>
          {loading ? "Fetching..." : "Fetch joke"}
        </button>

        {/* INITIAL STATE */}
        {!joke && !error && !loading && <p>No joke yet.</p>}

        {/* SUCCESS STATE */}
        {joke && (
          <>
            <p>{joke.setup}</p>
            <p><strong>{joke.punchline}</strong></p>
          </>
        )}

        {/* ERROR STATE */}
        {error && (
          <>
            <p style={{ color: "red" }}>Could not fetch a joke. Try again.</p>
            <button onClick={fetchJoke}>Try again</button>
          </>
        )}
      </div>
    </div>
  );
}