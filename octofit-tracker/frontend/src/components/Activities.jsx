import { useEffect, useState } from 'react'
import { fetchApiData, API_BASE_URL, isCodespaceFallback } from '../api.js'
// Endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchApiData('activities')
        setActivities(data)
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Unable to load activities')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  return (
    <section className="container py-5">
      <div className="mb-4">
        <h2>Activities</h2>
        <p className="text-muted">Fetches activity rows from <code>{API_BASE_URL}/activities</code>.</p>
        {isCodespaceFallback && (
          <div className="alert alert-warning">VITE_CODESPACE_NAME is not set; using local API fallback.</div>
        )}
      </div>

      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && activities.length === 0 && (
        <div className="alert alert-secondary">No activities available.</div>
      )}

      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6" key={activity._id ?? `${activity.user}-${activity.type}-${activity.durationMinutes}`}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{activity.type}</h5>
                <p className="card-text mb-1"><strong>User:</strong> {activity.user ?? 'Unknown'}</p>
                <p className="card-text mb-1"><strong>Duration:</strong> {activity.durationMinutes ?? 0} min</p>
                <p className="card-text mb-1"><strong>Distance:</strong> {activity.distanceKm ?? 0} km</p>
                <p className="card-text mb-0"><strong>Calories:</strong> {activity.calories ?? 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Activities
