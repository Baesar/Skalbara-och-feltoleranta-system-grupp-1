import { useState } from "react"

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [sirName, setSirName] = useState('')

  const handelSubmit = async (e) => {
    e.preventDefault()

    console.log(name, sirName, email, password)
  }

  return (
    <form className="signup" onSubmit={handelSubmit}>
      <h3>Sign up</h3>

      <label>First name:</label>
      <input
        type="name"
        onChange={(e) => setName(e.target.value)}
        value={name}  
      />

      <label>Last name:</label>
      <input
        type="name"
        onChange={(e) => setSirName(e.target.value)}
        value={sirName}  
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

      <button >Sign up</button>
    </form>
  )
}

export default SignUpPage













// import * as React from 'react';
// import { NavLink } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import MuiCard from '@mui/material/Card';
// import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
// import getSignUpTheme from '../Components/theme/getSignUpTheme';
// import { GetBetterIcon } from '../Components/CostumIcons';

// import { useSignup } from '../hooks/useSignup';

// const Card = styled(MuiCard)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   width: '100%',
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   margin: 'auto',
//   boxShadow:
//     'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
//   [theme.breakpoints.up('sm')]: {
//     width: '450px',
//   },
//   ...theme.applyStyles('dark', {
//     boxShadow:
//       'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
//   }),
// }));

// const SignUpContainer = styled(Stack)(({ theme }) => ({
//   height: '100%',
//   padding: 4,
//   backgroundImage:
//     'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
//   backgroundRepeat: 'no-repeat',
//   ...theme.applyStyles('dark', {
//     backgroundImage:
//       'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
//   }),
// }));

// // The SignUp page for creating your account
// export default function SignUp() {
//   const [mode, setMode] = React.useState('light');
//   const [showCustomTheme] = React.useState(true);
//   const defaultTheme = createTheme({ palette: { mode } });
//   const SignUpTheme = createTheme(getSignUpTheme(mode));
//   const [emailError, setEmailError] = React.useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
//   const [passwordError, setPasswordError] = React.useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
//   const [nameError, setNameError] = React.useState(false);
//   const [nameErrorMessage, setNameErrorMessage] = React.useState('');

//   const { signup, isLoading, error } = useSignup();

//   // Default values for hidden fields
//   const defaultRole = 'member';
//   const defaultBuildingAccess = { A: false, B: false };
//   const defaultAccessLayers = { A: '', B: '' };

//   // This code only runs on the client side, to determine the system color preference
//   React.useEffect(() => {
//     const savedMode = localStorage.getItem('themeMode');
//     if (savedMode) {
//       setMode(savedMode);
//     } else {
//       const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       setMode(systemPrefersDark ? 'dark' : 'light');
//     }
//   }, []);

//   const validateInputs = () => {
//     const email = document.getElementById('email');
//     const password = document.getElementById('password');
//     const name = document.getElementById('name');

//     let isValid = true;

//     if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
//       setEmailError(true);
//       setEmailErrorMessage('Please enter a valid email address.');
//       isValid = false;
//     } else {
//       setEmailError(false);
//       setEmailErrorMessage('');
//     }

//     if (!password.value || password.value.length < 6) {
//       setPasswordError(true);
//       setPasswordErrorMessage('Password must be at least 6 characters long.');
//       isValid = false;
//     } else {
//       setPasswordError(false);
//       setPasswordErrorMessage('');
//     }

//     if (!name.value || name.value.length < 1) {
//       setNameError(true);
//       setNameErrorMessage('Name is required.');
//       isValid = false;
//     } else {
//       setNameError(false);
//       setNameErrorMessage('');
//     }

//     return isValid;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validateInputs()) {
//       return;
//     }

//     const data = new FormData(event.currentTarget);
//     const username = data.get('name');
//     const email = data.get('email');
//     const password = data.get('password');

//     // Include hidden fields in signup
//     await signup(username, email, password, defaultRole, defaultBuildingAccess, defaultAccessLayers);

//     console.log({
//       name: data.get('name'),
//       email: data.get('email'),
//       password: data.get('password'),
//       role: defaultRole,
//       buildingAccess: defaultBuildingAccess,
//       accessLayers: defaultAccessLayers,
//     });
//   };

//   return (
//     <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
//       <CssBaseline enableColorScheme />
//       <SignUpContainer direction="column" justifyContent="space-between">
//         <Stack sx={{ justifyContent: 'center', height: '100dvh', p: 2 }}>
//           <Card variant="outlined">
//             <GetBetterIcon /> {/* SITEMARK THING. CHANGE IT :3 */}
//             <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
//               Sign up
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <FormControl>
//                 <FormLabel htmlFor="name">Username</FormLabel>
//                 <TextField
//                   autoComplete="name"
//                   name="name"
//                   required
//                   fullWidth
//                   id="name"
//                   placeholder="username"
//                   error={nameError}
//                   helperText={nameErrorMessage}
//                   color={nameError ? 'error' : 'primary'}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel htmlFor="email">Email</FormLabel>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   placeholder="email"
//                   name="email"
//                   autoComplete="email"
//                   variant="outlined"
//                   error={emailError}
//                   helperText={emailErrorMessage}
//                   color={emailError ? 'error' : 'primary'}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel htmlFor="password">Password</FormLabel>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   placeholder="password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   variant="outlined"
//                   error={passwordError}
//                   helperText={passwordErrorMessage}
//                   color={passwordError ? 'error' : 'primary'}
//                 />
//               </FormControl>
//               <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
//                 Sign up
//               </Button>
//               {error && <div className="error">{error}</div>}
//               <Typography sx={{ textAlign: 'center' }}>
//                 Already have an account?{' '}
//                 <span>
//                   <NavLink to="/SignIn" activeClassName="active">
//                     Sign in
//                   </NavLink>
//                 </span>
//               </Typography>
//             </Box>
//           </Card>
//         </Stack>
//       </SignUpContainer>
//     </ThemeProvider>
//   );
// }
