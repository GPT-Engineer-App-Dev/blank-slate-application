import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Heading, VStack, FormControl, FormLabel, Input, Button, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useVenue, useAddVenue, useUpdateVenue } from '../integrations/supabase/index.js';

const VenueForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { data: venue, error: venueError, isLoading: venueLoading } = useVenue(id);
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();

  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    type: ''
  });

  useEffect(() => {
    if (venue) {
      setFormData({
        name: venue.name,
        capacity: venue.capacity,
        type: venue.type
      });
    }
  }, [venue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateVenue.mutateAsync({ id, ...formData });
    } else {
      await addVenue.mutateAsync(formData);
    }
    navigate('/venues');
  };

  if (venueLoading) return <Spinner />;
  if (venueError) return <Alert status="error"><AlertIcon />{venueError.message}</Alert>;

  return (
    <Container maxW="container.md">
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <Heading as="h1" size="xl">{isEdit ? 'Edit Venue' : 'Create Venue'}</Heading>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="capacity" isRequired>
          <FormLabel>Capacity</FormLabel>
          <Input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />
        </FormControl>
        <FormControl id="type" isRequired>
          <FormLabel>Type</FormLabel>
          <Input name="type" value={formData.type} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="teal">{isEdit ? 'Update' : 'Create'}</Button>
      </VStack>
    </Container>
  );
};

export default VenueForm;