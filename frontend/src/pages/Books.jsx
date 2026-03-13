import { useState, useEffect } from 'react';
import { Card, Col, Row, Spinner, Alert } from 'react-bootstrap';
import api from '../api/axios';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Calling backend API from port 8084
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2 className="mb-4">Available Books</h2>
      {books.length === 0 ? (
        <Alert variant="info">No books available currently.</Alert>
      ) : (
        <Row xs={1} md={3} className="g-4">
          {books.map((book) => (
            <Col key={book.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={book.coverImage || 'https://via.placeholder.com/150'}
                  alt={book.title}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    <strong>Author:</strong> {book.author} <br />
                    <strong>Category:</strong> {book.categoryName}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Books;
