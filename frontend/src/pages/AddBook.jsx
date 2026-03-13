import { useState } from 'react';
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

function AddBook() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [page, setPage] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [bookCode, setBookCode] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isbn, setIsbn] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [translator, setTranslator] = useState('');
  const [categoryId, setCategoryId] = useState(''); // Default empty initially
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!imageFile) {
      setError('Please upload a cover image.');
      return;
    }

    setLoading(true);

    try {
      // 1. Prepare JSON Request
      const bookRequest = {
        title,
        author,
        description,
        price: parseFloat(price),
        page: parseInt(page),
        quantity: parseInt(quantity),
        bookCode,
        publisher,
        isbn,
        dimensions,
        translator,
        categoryId: parseInt(categoryId) || 1 // Fallback or could throw error
      };

      // 2. Prepare FormData
      const formData = new FormData();
      formData.append('file', imageFile);
      // Backend expects the JSON object as a Blob/part named 'bookRequest'
      formData.append('bookRequest', new Blob([JSON.stringify(bookRequest)], {
        type: 'application/json'
      }));

      // 3. Send request
      await api.post('/books/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/books');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving the book.');
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Add New Book</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control 
                type="file" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Book Code</Form.Label>
                  <Form.Control type="text" value={bookCode} onChange={(e) => setBookCode(e.target.value)} required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category ID</Form.Label>
                  <Form.Control type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
                </Form.Group>
              </div>

              <div className="col-md-6">
                 <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Pages</Form.Label>
                  <Form.Control type="number" value={page} onChange={(e) => setPage(e.target.value)} required />
                </Form.Group>

                 <Form.Group className="mb-3">
                  <Form.Label>Publisher</Form.Label>
                  <Form.Control type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Dimensions</Form.Label>
                  <Form.Control type="text" value={dimensions} onChange={(e) => setDimensions(e.target.value)} />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>

            <Button variant="success" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : 'Save Book'}
            </Button>
            <Button variant="secondary" className="ms-2" onClick={() => navigate('/books')}>
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddBook;
