import { render, screen } from '@testing-library/react'

import Pokemon from 'pages/Pokemon'
import { PokemonQuery, PokemonType } from '../../types'
import { useGetPokemonByIdQuery } from '../../api/index'

jest.mock('../../api/index')

describe('Pokemon Component', () => {
  test('renders loading message while fetching data', async () => {
    const mockData: PokemonQuery = {
      data: undefined,
      isLoading: true,
      isError: false,
    }

    ;(useGetPokemonByIdQuery as jest.Mock).mockReturnValue(mockData)

    render(<Pokemon />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders error message if data fetching fails', async () => {
    const mockError = 'Error fetching Pokémon details.'

    const mockData: PokemonQuery = {
      data: undefined,
      isLoading: false,
      isError: true,
    }

    ;(useGetPokemonByIdQuery as jest.Mock).mockReturnValue(mockData)

    render(<Pokemon />)

    expect(screen.getByText(mockError)).toBeInTheDocument()
  })

  test('renders Pokemon details when data is fetched successfully', async () => {
    const mockPokemon: PokemonType = {
      name: 'Pikachu',
      weight: '10',
      height: '5',
      types: [{ type: { name: 'Electric' } }],
      sprites: { front_default: 'some/image/url' },
    }

    const mockData: PokemonQuery = {
      data: mockPokemon,
      isLoading: false,
      isError: false,
    }

    ;(useGetPokemonByIdQuery as jest.Mock).mockReturnValue(mockData)

    render(<Pokemon />)

    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByAltText('Pikachu')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Electric')).toBeInTheDocument()
  })
})
