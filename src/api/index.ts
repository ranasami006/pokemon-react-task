// api/index.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonQuery, PokemonsList } from '../types'; // Adjust the import path as needed

export const pokemonAPISlice = createApi({
  reducerPath: 'pokemon',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API_URL }),
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonsList, number>({
      query: (offset) => `pokemon?offset=${offset}&limit=20`,
    }),
    getPokemonById: builder.query<PokemonQuery, string>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByIdQuery } = pokemonAPISlice;
