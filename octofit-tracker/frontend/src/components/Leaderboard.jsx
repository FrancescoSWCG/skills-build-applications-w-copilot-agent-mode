import { useEffect, useState } from 'react'
import { fetchApiData, API_BASE_URL, isCodespaceFallback } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchApiData('leaderboard')
        setEntries(data)
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  return (
    <section className="container py-5">
      <div className="mb-4">
        <h2>Leaderboard</h2>
        <p className="text-muted">Fetches leaderboard data from <code>{API_BASE_URL}/leaderboard</code>.</p>
        {isCodespaceFallback && (
          <div className="alert alert-warning">VITE_CODESPACE_NAME is not set; using local API fallback.</div>
        )}
      </div>

      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && entries.length === 0 && (
        <div className="alert alert-secondary">No leaderboard entries available.</div>
      )}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Score</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id ?? `${entry.user?.name ?? entry.user}-${entry.score}-${entry.streak}`}>
                <td>{entry.user?.name ?? entry.user ?? 'Unknown'}</td>
                <td>{entry.score ?? 0}</td>
                <td>{entry.streak ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
