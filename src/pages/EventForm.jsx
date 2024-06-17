import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Heading, VStack, FormControl, FormLabel, Input, Button, Spinner, Alert, AlertIcon, Select } from '@chakra-ui/react';
import { useEvent, useAddEvent, useUpdateEvent, useVenues } from '../integrations/supabase/index.js';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { data: event, error: eventError, isLoading: eventLoading } = useEvent(id);
  const { data: venues, error: venuesError, isLoading: venuesLoading } = useVenues();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    venue: ''
  });

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name,
        date: event.date,
        venue: event.venue
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateEvent.mutateAsync({ id, ...formData });
    } else {
      await addEvent.mutateAsync(formData);
    }
    navigate('/events');
  };

  if (eventLoading || venuesLoading) return <Spinner />;
  if (eventError || venuesError) return <Alert status="error"><AlertIcon />{eventError?.message || venuesError?.message}</Alert>;

  return (
    <Container maxW="container.md">
      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        <Heading as="h1" size="xl">{isEdit ? 'Edit Event' : 'Create Event'}</Heading>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="date" isRequired>
          <FormLabel>Date</FormLabel>
          <Input type="date" name="date" value={formData.date} onChange={handleChange} />
        </FormControl>
        <FormControl id="venue" isRequired>
          <FormLabel>Venue</FormLabel>
          <Select name="venue" value={formData.venue} onChange={handleChange}>
            <option value="">Select Venue</option>
            {venues.map(venue => (
              <option key={venue.id} value={venue.id}>{venue.name}</option>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal">{isEdit ? 'Update' : 'Create'}</Button>
      </VStack>
    </Container>
  );
};

export default EventForm;