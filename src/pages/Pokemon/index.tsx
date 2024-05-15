import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPokemonByIdQuery } from '../../api';
import { PokemonQuery, Type } from '../../types'; // Adjust the import path as needed
import './styles.css';

const Pokemon = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: pokemon,
    isLoading,
    isError,
  } = useGetPokemonByIdQuery(id as string);

  if (isLoading) return <div className='message'>Loading...</div>;

  if (isError) return <div className='message'>Error fetching Pokémon details.</div>;

  return (
    <div className='pokemon-container'>
      <div className='pokemon-center'>
        <h2 className='pokemon-name'>{pokemon?.name}</h2>
        <div className='pokemon-image'>
          <img
            src={pokemon?.sprites.front_default}
            alt={pokemon?.name}
          />
        </div>
        <div className='pokemon-details'>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{pokemon?.name}</td>
              </tr>
              <tr>
                <th>Height</th>
                <td>{pokemon?.height}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{pokemon?.weight}</td>
              </tr>
              <tr>
                <th>Types</th>
                <td>
                  {pokemon?.types.map(({ type }: Type, index: number) => (
                    <span key={index} className='pokemon-type'>
                      {type.name}
                    </span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
