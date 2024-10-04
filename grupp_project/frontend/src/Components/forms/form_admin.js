
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
//This is the form that makes it possible to comminucate to a server
const AdminForm = () => {
// anything after id is not required since its something admins only do. important for signup later 

  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
    name: '',
    sirname: '',
    id: '',
    buildingAccess: {
      A: false,
      B: false,
    },
    accessLayers: {
      A: '',
      B: '',
    },
  });
//This handeles changes in input .
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        buildingAccess: {
          ...formData.buildingAccess,
          [name]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
// this handeles the changes in the access layer part of the form .
  const handleSelectChange = (e, building) => {
    setFormData({
      ...formData,
      accessLayers: {
        ...formData.accessLayers,
        [building]: e.target.value,
      },
    });
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
          <MenuItem value="patient">Patient</MenuItem>
          <MenuItem value="member">Member</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
        </Select>
      </FormControl>

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

      {/* Name Input */}
      <TextField
        fullWidth
        margin="normal"
        id="name"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        id="sirname"
        label="SirName"
        name="sirname"
        value={formData.sirname}
        onChange={handleInputChange}
        required
      />

      

      {/* ID Input 
      Id should have 10 symbols. 2 random numbers, initials of the person then the rest are pure randomly.*/}
      <TextField
        fullWidth
        margin="normal"
        id="id"
        label="ID"
        name="id"
        value={formData.id}
        onChange={handleInputChange}
        required
      />

      {/* Access Level 
      To simply add here, this is for where in a building you can go and what you can expect to be able to
      access if you are that person.*/}
      <h2>Access Level</h2>
      <p>Select the buildings you have access to and choose the corresponding access layer for each:</p>

      <FormGroup>
        {/* Building A */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.buildingAccess.A}
              onChange={handleInputChange}
              name="A"
            />
          }
          label="Building A"
        />
        <Select
          name="access_layer_A"
          value={formData.accessLayers.A}
          onChange={(e) => handleSelectChange(e, 'A')}
          disabled={!formData.buildingAccess.A}
          fullWidth
        >
          <MenuItem value="1">Layer 1</MenuItem>
          <MenuItem value="2">Layer 2</MenuItem>
          <MenuItem value="3">Layer 3</MenuItem>
          <MenuItem value="4">Layer 4</MenuItem>
          <MenuItem value="5">Layer 5</MenuItem>
        </Select>

        {/* Building B */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.buildingAccess.B}
              onChange={handleInputChange}
              name="B"
            />
          }
          label="Building B"
        />
        <Select
          name="access_layer_B"
          value={formData.accessLayers.B}
          onChange={(e) => handleSelectChange(e, 'B')}
          disabled={!formData.buildingAccess.B}
          fullWidth
        >
          <MenuItem value="1">Layer 1</MenuItem>
          <MenuItem value="2">Layer 2</MenuItem>
          <MenuItem value="3">Layer 3</MenuItem>
          <MenuItem value="4">Layer 4</MenuItem>
          <MenuItem value="5">Layer 5</MenuItem>
        </Select>
      </FormGroup>

      {/* Submit Button */}
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Submit
      </Button>
    </form>
  );
};

export default AdminForm;
