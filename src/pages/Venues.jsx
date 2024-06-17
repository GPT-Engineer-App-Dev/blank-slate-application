import { useState } from 'react';
import { Container, Heading, Button, VStack, HStack, Spinner, Alert, AlertIcon, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useVenues, useDeleteVenue } from '../integrations/supabase/index.js';
import { Link } from 'react-router-dom';

const Venues = () => {
  const { data: venues, error, isLoading } = useVenues();
  const deleteVenue = useDeleteVenue();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      await deleteVenue.mutateAsync(id);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Alert status="error"><AlertIcon />{error.message}</Alert>;

  return (
    <Container maxW="container.xl">
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between">
          <Heading as="h1" size="xl">Venues</Heading>
          <Button as={Link} to="/venues/new" colorScheme="teal">Create Venue</Button>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Capacity</Th>
              <Th>Type</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {venues.map(venue => (
              <Tr key={venue.id}>
                <Td>{venue.name}</Td>
                <Td>{venue.capacity}</Td>
                <Td>{venue.type}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton as={Link} to={`/venues/${venue.id}/edit`} icon={<FaEdit />} />
                    <IconButton icon={<FaTrash />} onClick={() => handleDelete(venue.id)} />
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

export default Venues;