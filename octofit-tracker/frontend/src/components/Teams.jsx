import { useEffect, useState } from 'react'
import { fetchApiData, API_BASE_URL, isCodespaceFallback } from '../api.js'
// Endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchApiData('teams')
        setTeams(data)
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load teams')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  return (
    <section className="container py-5">
      <div className="mb-4">
        <h2>Teams</h2>
        <p className="text-muted">Fetches team data from <code>{API_BASE_URL}/teams</code>.</p>
        {isCodespaceFallback && (
          <div className="alert alert-warning">VITE_CODESPACE_NAME is not set; using local API fallback.</div>
        )}
      </div>

      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && teams.length === 0 && (
        <div className="alert alert-secondary">No teams available.</div>
      )}

      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-lg-6" key={team._id ?? team.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text mb-1"><strong>Focus:</strong> {team.focus}</p>
                <p className="card-text mb-1"><strong>Weekly goal:</strong> {team.weeklyGoal}</p>
                <p className="card-text mb-0"><strong>Members:</strong> {(team.members ?? []).length}</p>
                {(team.members ?? []).length > 0 && (
                  <ul className="list-unstyled mt-3 mb-0 small text-muted">
                    {(team.members ?? []).map((member) => (
                      <li key={member?._id ?? member}>{member?.name ?? member ?? 'Member'}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams
