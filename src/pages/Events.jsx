import { useState } from 'react';
import { Container, Heading, Button, VStack, HStack, Spinner, Alert, AlertIcon, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEvents, useDeleteEvent } from '../integrations/supabase/index.js';
import { Link } from 'react-router-dom';

const Events = () => {
  const { data: events, error, isLoading } = useEvents();
  const deleteEvent = useDeleteEvent();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteEvent.mutateAsync(id);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Alert status="error"><AlertIcon />{error.message}</Alert>;

  return (
    <Container maxW="container.xl">
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between">
          <Heading as="h1" size="xl">Events</Heading>
          <Button as={Link} to="/events/new" colorScheme="teal">Create Event</Button>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Venue</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map(event => (
              <Tr key={event.id}>
                <Td>{event.name}</Td>
                <Td>{event.date}</Td>
                <Td>{event.venue}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton as={Link} to={`/events/${event.id}/edit`} icon={<FaEdit />} />
                    <IconButton icon={<FaTrash />} onClick={() => handleDelete(event.id)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Events;