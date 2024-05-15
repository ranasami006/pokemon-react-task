export interface PokemonData {
  name: string
  url: string
}

export interface ColumnDefinition {
  accessorKey: string
  Header: string
  cell: (info: any) => JSX.Element
  footer: (props: any) => string
}

export interface PaginationState {
  pagination: {
    currentPage: number
  }
}

export interface PokemonResultData {
  results: PokemonData[]
  count: number
}

// types.ts
export interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Sprites {
  front_default: string;
}

export interface PokemonQuery {
  name: string;
  height: number;
  weight: number;
  sprites: Sprites;
  types: Type[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonsList {
  count: number;
  results: Pokemon[];
}







export interface PokemonType {
  name: string
  weight: string
  types: Type[]
  height: string
  sprites: {
    front_default: string
  }
}

// export interface PokemonQuery {
//   data: PokemonType | undefined
//   isError: boolean
//   isLoading: boolean
// }

export interface Table {
  data: any
  columns: ColumnDefinition[]
  count: number
  fetchData: (index: number) => void
  page: any
}

