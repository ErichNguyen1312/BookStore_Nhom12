import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

function BookDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/search/${slug}`);
        setBook(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching book details');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [slug]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading book details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={() => navigate('/books')}>Back to Books</Button>
      </Container>
    );
  }

  if (!book) return null;

  return (
    <Container className="my-5">
      <Button variant="link" className="mb-3 p-0" onClick={() => navigate('/books')}>
        &larr; Back to Books
      </Button>
      <Card className="shadow-lg border-0 overflow-hidden" style={{ borderRadius: '15px' }}>
        <Row className="g-0">
          <Col md={4}>
            <Card.Img 
              src={book.image || 'https://via.placeholder.com/400x600'} 
              alt={book.bookTitle}
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <Card.Body className="p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="display-5 fw-bold mb-1">{book.bookTitle}</h1>
                  <p className="text-muted fs-4">by {book.author}</p>
                </div>
                <Badge bg="info" className="p-2 fs-6">{book.categoryName}</Badge>
              </div>

              <div className="mb-4">
                <span className="h3 text-success fw-bold">${book.price?.toLocaleString()}</span>
                {book.quantity > 0 ? (
                  <Badge bg="success" className="ms-3">In Stock ({book.quantity})</Badge>
                ) : (
                  <Badge bg="danger" className="ms-3">Out of Stock</Badge>
                )}
              </div>

              <hr />

              <div className="mt-4">
                <h5 className="fw-bold mb-3">Description</h5>
                <Card.Text className="text-secondary lh-lg">
                  {book.description || 'No description available for this book.'}
                </Card.Text>
              </div>

              <div className="mt-auto pt-4">
                <Button variant="primary" size="lg" disabled={book.quantity === 0}>
                  Add to Cart
                </Button>
                <Button variant="outline-dark" size="lg" className="ms-3">
                  Add to Wishlist
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default BookDetail;
