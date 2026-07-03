import './App.css'
import { NavLink, Routes, Route } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active' : 'text-secondary'}`

  return (
    <>
      <header className="bg-white border-bottom">
        <div className="container py-3">
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            <div>
              <p className="text-uppercase fw-bold text-primary mb-1">OctoFit Tracker</p>
              <h1 className="h3 mb-0">Train smarter, compete together.</h1>
            </div>
            <nav className="nav gap-2">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/users" className={linkClass}>
                Users
              </NavLink>
              <NavLink to="/teams" className={linkClass}>
                Teams
              </NavLink>
              <NavLink to="/activities" className={linkClass}>
                Activities
              </NavLink>
              <NavLink to="/workouts" className={linkClass}>
                Workouts
              </NavLink>
              <NavLink to="/leaderboard" className={linkClass}>
                Leaderboard
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <section className="card shadow-sm border-0">
                <div className="card-body p-5">
                  <p className="text-uppercase fw-bold text-primary">Welcome</p>
                  <h2 className="display-6 fw-bold mb-3">OctoFit Tracker</h2>
                  <p className="lead text-muted mb-4">
                    Navigate the app using the tabs above to review users, teams,
                    activities, workouts, and the leaderboard.
                  </p>
                  <p className="mb-0">
                    This app uses the backend API via Vite environment variables and supports both array and paginated responses.
                  </p>
                </div>
              </section>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="*"
            element={
              <div className="alert alert-warning">
                Page not found. Use the navigation links to explore the app.
              </div>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App
