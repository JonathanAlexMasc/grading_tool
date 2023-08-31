import { Button, Container } from 'react-bootstrap';
import BootstrapTable from './components/Table';
import { useEffect, useState } from 'react';

import axios from 'axios';

function App() {

  const [data, setData] = useState([]);

  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:3001/students');
    setData(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const addRow = async (submit_person, other_person, the_grade) => {
    //make post request to server
    const response = await axios.post('http://localhost:3001/students', {
      Submitter: submit_person,
      Partner: other_person,
      Grade: the_grade
    })
    const newData = [...data, response.data];
    setData(newData);
  };

  const deleteRow = async (id) => {
    console.log("id", id);
    //make delete request to server
    await axios.delete(`http://localhost:3001/students/${id}`);
    const updatedStudents = data.filter((student) => {
      return student.id !== id;
    });
    setData(updatedStudents);
  }

  const handleClear = async () => {

    data.map(async (student) => {
      await axios.delete(`http://localhost:3001/students/${student.id}`);
    });
    const updatedStudents = [];
    setData(updatedStudents);
  }

  return (
    <Container>

      <BootstrapTable addRow={addRow} deleteRow={deleteRow} data={data} setData={setData} />

      <Button variant='danger' onClick={handleClear}>Clear Entries</Button>
    </Container >
  );
}

export default App;
