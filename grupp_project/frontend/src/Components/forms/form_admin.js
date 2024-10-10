
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
//This is the form that makes it possible to comminucate to a server
const AdminForm = () => {
// anything after id is not required since its something admins only do. important for signup later 

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: ''
  });
//This handeles changes in input .
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

// this prints the info in the website. use f12 to see .
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData, formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      {/* Role Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="role-label">Select Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          required
        >
          <MenuItem value="member">Member</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
        </Select>
      </FormControl>

      {/* Name Input */}
      <TextField
        fullWidth
        margin="normal"
        id="firstname"
        label="First name"
        name="firstname"
        value={formData.firstname}
        onChange={handleInputChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        id="lastname"
        label="Last name"
        name="lastname"
        value={formData.lastname}
        onChange={handleInputChange}
        required
      />

      {/* Email Input */}
      <TextField
        fullWidth
        margin="normal"
        id="email"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />

      {/* Password Input */}
      <TextField
        fullWidth
        margin="normal"
        id="password"
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />

      {/* Submit Button */}
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default AdminForm;
