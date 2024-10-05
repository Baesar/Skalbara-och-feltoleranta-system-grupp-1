import { useState } from 'react';
import { useSignin } from '../hooks/useSignin';
import { NavLink } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signin, error, isLoading } = useSignin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(email, password);
  };

  return (
    <form className="signin" onSubmit={handleSubmit}>
      <h3>Sign in</h3>

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <div className='no-account'>
        <label>Don't have an account?</label>
        <NavLink to="/SignUp" activeClassName="active" className={"navlink"}>
          Sign up
        </NavLink>
      </div>

      <button disabled={isLoading}>Sign in</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignInPage;
