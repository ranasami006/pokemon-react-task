import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from '@mui/material';
import { useGetPokemonsQuery } from '../../api/index';
import { Pokemon, PokemonsList } from '../../types'; // Adjust the import path as needed
import './styles.css';

const Lists = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const { data: pokemonList, error, isLoading } = useGetPokemonsQuery(page);

  const handleRedirection = (url: string) => {
    const id = url.split('/').splice(-2, 1)[0];
    navigate(`/pokemon/${id}`);
  };

  const fetchData = (index: number) => {
    setPage(index);
  };

  if (isLoading) return <div className='message'>Loading...</div>;
  if (error) return <div className='message'>Error...</div>;

  return (
    <div className='poke-container'>
      <div className='heading'>Poke React</div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonList?.results.map((pokemon: Pokemon) => (
              <TableRow key={pokemon.name} onClick={() => handleRedirection(pokemon.url)} className='poke'>
                <TableCell>{pokemon.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='pagination'>
        <Button onClick={() => fetchData(page - 1)} disabled={page === 0}>
          {'<'}
        </Button>
        <Button onClick={() => fetchData(page + 1)} disabled={pokemonList && pokemonList.results.length < pageSize}>
          {'>'}
        </Button>
        <span>
          Page <strong>{page + 1}</strong>
        </span>
        <Select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <MenuItem key={size} value={size}>
              Show {size}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Lists;
