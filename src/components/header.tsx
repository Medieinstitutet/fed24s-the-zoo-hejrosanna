import { NavLink, Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="site-header">
      <nav className="nav-container">
        <h1 className="logo">
          <Link to="/">🐾 The Zoo</Link>
        </h1>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/animals" className={({ isActive }) => isActive ? 'active' : ''}>
              Animals
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header


