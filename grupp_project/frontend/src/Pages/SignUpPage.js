import { useState } from 'react'
import { useSignup } from '../hooks/useSignup';

import { NavLink } from 'react-router-dom';

const SignUpPage = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error } = useSignup()

  const handelSubmit = async (e) => {
    e.preventDefault()

    await signup(firstname, lastname, email, password, 'member')
  }

  return (
    <form className="signup" onSubmit={handelSubmit}>
      <h3>Sign up</h3>

      <label>First name:</label>
      <input
        type="name"
        onChange={(e) => setFirstname(e.target.value)}
        value={firstname}
      />

      <label>Last name:</label>
      <input
        type="name"
        onChange={(e) => setLastname(e.target.value)}
        value={lastname}
      />

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <div className='already-account'>
        <label>Already have an account?</label>
        <NavLink to="/SignIn" activeClassName="active" className={"navlink"}>
          Sign in
        </NavLink> 
      </div>

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default SignUpPage