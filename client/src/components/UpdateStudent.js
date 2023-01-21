import { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export default function UpdateStudent() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [student, setStudent] = useState({
    _id: searchParams.get('id'),
    generalRegistrationNumber: searchParams.get('gr'),
    name: searchParams.get('name'),
    email: searchParams.get('email'),
    address: searchParams.get('address'),
    city: searchParams.get('city'),
    grade: searchParams.get('grade'),
    section: searchParams.get('section'),
  });

  const [city, setCity] = useState(searchParams.get('city'));
  const [grade, setGrade] = useState(searchParams.get('grade'));
  const [section, setSection] = useState(searchParams.get('section'));

  const handleUpdate = () => {
    axiosPrivate.patch('/students', student).then(() => {
      navigate('/students');
    });
  };

  return (
    <Container>
      <h2>Update Student</h2>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="generalRegistrationNumber"
          label="GR Number"
          variant="outlined"
          defaultValue={student.generalRegistrationNumber}
          value={student.generalRegistrationNumber}
          onChange={(event) => {
            setStudent({
              ...student,
              generalRegistrationNumber: event.target.value,
            });
          }}
        />
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={student.name}
          onChange={(event) => {
            setStudent({ ...student, name: event.target.value });
          }}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={student.email}
          onChange={(event) => {
            setStudent({ ...student, email: event.target.value });
          }}
        />
        <TextField
          id="address"
          label="Address Line"
          variant="outlined"
          value={student.address}
          onChange={(event) => {
            setStudent({ ...student, address: event.target.value });
          }}
        />

        <FormControl fullWidth>
          <InputLabel>City</InputLabel>
          <Select
            labelId="city-label"
            id="city"
            value={city}
            label="City"
            onChange={(event) => {
              setStudent({ ...student, city: event.target.value });
              setCity(event.target.value);
            }}
          >
            <MenuItem value="Abu Dhabi">Abu Dhabi</MenuItem>
            <MenuItem value="Dubai">Dubai</MenuItem>
            <MenuItem value="Sharjah">Sharjah</MenuItem>
            <MenuItem value="Ajman">Ajman</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Grade</InputLabel>
          <Select
            labelId="grade-label"
            id="grade"
            value={grade}
            label="Grade"
            onChange={(event) => {
              setStudent({ ...student, grade: event.target.value });
              setGrade(event.target.value);
            }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Section</InputLabel>
          <Select
            labelId="section-label"
            id="section"
            value={section}
            label="Section"
            onChange={(event) => {
              setStudent({ ...student, section: event.target.value });
              setSection(event.target.value);
            }}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem>
            <MenuItem value="E">E</MenuItem>
            <MenuItem value="F">F</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="success" onClick={handleUpdate}>
          Update
        </Button>
      </Box>
    </Container>
  );
}
