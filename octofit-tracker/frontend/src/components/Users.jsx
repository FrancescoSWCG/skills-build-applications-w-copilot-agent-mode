import { useEffect, useState } from 'react'
import { fetchApiData, API_BASE_URL, isCodespaceFallback } from '../api.js'
// Endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchApiData('users')
        setUsers(data)
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load users')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  return (
    <section className="container py-5">
      <div className="mb-4">
        <h2>Users</h2>
        <p className="text-muted">Fetches profiles from <code>{API_BASE_URL}/users</code>.</p>
        {isCodespaceFallback && (
          <div className="alert alert-warning">VITE_CODESPACE_NAME is not set; using local API fallback.</div>
        )}
      </div>

      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className="alert alert-secondary">No users available.</div>
      )}

      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6" key={user._id ?? user.email ?? user.name}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text mb-1"><strong>Email:</strong> {user.email}</p>
                <p className="card-text mb-1"><strong>Role:</strong> {user.role}</p>
                <p className="card-text mb-0"><strong>Fitness level:</strong> {user.fitnessLevel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Users
