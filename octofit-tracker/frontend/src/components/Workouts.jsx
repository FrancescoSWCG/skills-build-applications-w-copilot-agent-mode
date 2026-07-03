import { useEffect, useState } from 'react'
import { fetchApiData, API_BASE_URL, isCodespaceFallback } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchApiData('workouts')
        setWorkouts(data)
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load workouts')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  return (
    <section className="container py-5">
      <div className="mb-4">
        <h2>Workouts</h2>
        <p className="text-muted">Fetches workouts from <code>{API_BASE_URL}/workouts</code>.</p>
        {isCodespaceFallback && (
          <div className="alert alert-warning">VITE_CODESPACE_NAME is not set; using local API fallback.</div>
        )}
      </div>

      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && workouts.length === 0 && (
        <div className="alert alert-secondary">No workouts available.</div>
      )}

      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id ?? workout.title}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>
                <p className="card-text mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="card-text mb-1"><strong>Duration:</strong> {workout.durationMinutes ?? 0} min</p>
                <p className="card-text mb-0"><strong>Focus:</strong> {workout.focus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts
