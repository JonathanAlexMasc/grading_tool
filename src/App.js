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

  const handleGenClick = async () => {

    const sampleData = [
      { submit_person: 'John Doe', other_person: 'Jane Doe', the_grade: 85 },
      { submit_person: 'Alice Smith', other_person: 'Bob Johnson', the_grade: 92 },
      { submit_person: 'Eva Williams', other_person: 'Mike Brown', the_grade: 78 },
      { submit_person: 'Chris Davis', other_person: 'Emma White', the_grade: 88 },
      { submit_person: 'Olivia Martinez', other_person: 'Daniel Wilson', the_grade: 95 },
      { submit_person: 'Sam Taylor', other_person: 'Sophie Miller', the_grade: 70 },
      { submit_person: 'William Moore', other_person: 'Lily Davis', the_grade: 89 },
      { submit_person: 'Ava Anderson', other_person: 'James Jackson', the_grade: 93 },
      { submit_person: 'Noah Taylor', other_person: 'Grace Robinson', the_grade: 81 },
      { submit_person: 'Sophia Lee', other_person: 'Ryan Hall', the_grade: 76 },
      // Add more sample data as needed
    ];

    // Use Promise.all to make multiple requests in parallel
    const postRequests = sampleData.map(async (entry) => {
      const response = await axios.post('http://localhost:3001/students', {
        Submitter: entry.submit_person,
        Partner: entry.other_person,
        Grade: entry.the_grade
      });

      return response.data;
    });

    // Wait for all POST requests to complete
    const newSampleData = await Promise.all(postRequests);

    // Update state with the new sample data
    const updatedData = [...data, ...newSampleData];
    setData(updatedData);
  };


  return (
    <Container className='p-6 gap-3'>
      <div className='d-flex flex-column align-items-center mt-2 mb-3'>
        <h2>Grading Tool for CS 170 - Programming for Engineers and Scientists</h2>
      </div>

      <div className='d-flex justify-content-center'>
        <Button onClick={handleGenClick}>Generate Sample Data</Button>
      </div>

      <BootstrapTable addRow={addRow} deleteRow={deleteRow} data={data} setData={setData} className='p-3' />

      <Button variant='danger' onClick={handleClear}>Clear Entries</Button>
    </Container>

  );
}

export default App;
