import { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useTheme } from '@mui/material/styles';
import { Container } from '@material-ui/core';
import MaterialTable from 'material-table';
import NavBar from './NavBar';
import { ThemeProvider } from '@mui/material/styles';

export default function ListStudent() {
  const [rows, setRows] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const theme = useTheme();

  useEffect(() => {
    axiosPrivate.get('/students').then((students) => {
      setRows(students.data);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container>
        <h2>Student List</h2>
        <MaterialTable
          title="Student List"
          columns={[
            {
              title: 'GR No.',
              field: 'generalRegistrationNumber',
              type: 'numeric',
            },
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Address Line', field: 'address' },
            { title: 'City', field: 'city' },
            { title: 'Grade', field: 'grade', type: 'numeric' },
            { title: 'Section', field: 'section' },
          ]}
          data={rows}
          options={{
            filtering: true,
            actionsColumnIndex: -1,
          }}
          theme={theme}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, _) => {
                axiosPrivate.patch(`/students`, newData).then(() => {
                  const dataUpdate = [...rows];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setRows([...dataUpdate]);
                });
                resolve();
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, _) => {
                axiosPrivate
                  .delete(`/students/${oldData._id}`)
                  .then((response) => {
                    const dataDelete = [...rows];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setRows([...dataDelete]);
                  });
                resolve();
              }),
          }}
        />
      </Container>
    </ThemeProvider>
  );
}
