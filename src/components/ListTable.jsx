import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './PaginationComponent.jsx';

function ListTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [newTitle, setNewTitle] = useState('');
  const [updateItem, setUpdateItem] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error fetching data. Please try again later.');
      console.error('Error fetching data:', error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addItem = async () => {
    if (newTitle.trim() === '') {
      setError('Item cannot be blank');
      return;
    }
	const response = await axios.post('https://jsonplaceholder.typicode.com/albums', { id: data.length + 1, title: newTitle });
    setData([...data, { id: data.length + 1, title: newTitle }]);
    setNewTitle('');
    setError('');
  };

  const deleteItem = async (id) => {
	const response = await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}` );
    setData(data.filter(item => item.id !== id));
  };
  
  const updateSelectedItem = async () => {
    if (!selectedItem || updateItem.trim() === '') {
      setError('Please select an item and enter a new value');
      return;
    }
	const response = await axios.put(`https://jsonplaceholder.typicode.com/albums/${selectedItem.id}`, { title: updateItem });
    setData(data.map(item => item.id === selectedItem.id ? { ...item, title: updateItem } : item));
    setUpdateItem('');
    setSelectedItem(null);
    setError('');
  };

  const manageSelectedItem = (item) => {
    setSelectedItem(item);
    setUpdateItem(item.title);
    setError('');
  };

  const clearError = () => {
    setError('');
  };

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container">
      <h1 className="text-center">List Table</h1>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <Form.Group controlId="newItem">
            <Form.Label>Add New Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new title here..."
              value={newTitle}
              onChange={(e) => { setNewTitle(e.target.value); clearError(); }}
            />
          </Form.Group><br/>
          <div className="d-grid gap-2">
            <Button variant="dark" size="lg" onClick={addItem}>Add Title</Button>
          </div>
        </div>
      </div>
      <br/>
      {selectedItem && (
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <Form.Group controlId="updateItem">
              <Form.Label>Update Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter updated title here..."
                value={updateItem}
                onChange={(e) => { setUpdateItem(e.target.value); clearError(); }}
              />
            </Form.Group><br/>
            <div className="d-grid gap-2">
              <Button variant="dark" size="lg" onClick={updateSelectedItem}>Update Title</Button>
            </div>
          </div>
        </div>
      )}
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
      <br/>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Title</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td onClick={() => manageSelectedItem(item)}>{item.title}</td>
                  <td>
                    <Button variant="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-sm-10">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(data.length / rowsPerPage)}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ListTable;
