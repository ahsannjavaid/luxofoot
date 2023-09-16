import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = ({onCart}) => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark" style={{ backgroundColor: 'black' }}>
        <div className="container">
          <Link to={"/"} className='navbar-brand'>LuxoFoot</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav mx-auto">
              <NavLink className="nav-item nav-link" to={"/"}>HOME</NavLink>
              <NavLink className="nav-item nav-link" to={"/login"}>LOGIN</NavLink>
              <NavLink className="nav-item nav-link" to={"/signup"}>SIGNUP</NavLink>
            </div>
            <div className="navbar-nav mx-end">
              <NavLink to={"/cart"}>
                <img className='me-2' src='../assets/cart.png' alt='cart' height='30px' width='30px' style={{ opacity: `${onCart ? '1' : '0.7'}` }} />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar