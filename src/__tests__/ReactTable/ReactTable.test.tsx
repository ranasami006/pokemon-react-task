import { render, screen } from '@testing-library/react'

import ReactTable from 'components/ReactTable'
import { ColumnDefinition } from '../../types'

const columns: ColumnDefinition[] = [
  {
    accessorKey: 'name',
    Header: 'Name',
    cell: (info: any) => {
      return <div className='poke'>{info.getValue()} </div>
    },
    footer: (props) => props.column.id,
  },
]

const data = [
  { id: 1, name: 'Pikachu', url: 'some/url' },
  { id: 2, name: 'Bulbasaur', url: 'some/other/url' },
]

describe('ReactTable Component', () => {
  test('renders table with provided data', () => {
    const count = 2
    const fetchData = jest.fn()
    const page = 0

    render(
      <ReactTable
        data={data}
        columns={columns}
        count={count}
        fetchData={fetchData}
        page={page}
      />
    )

    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
  })

  test('calls fetchData function when table is rendered', () => {
    const count = 2
    const fetchData = jest.fn()
    const page = 0

    render(
      <ReactTable
        data={data}
        columns={columns}
        count={count}
        fetchData={fetchData}
        page={page}
      />
    )

    expect(fetchData).toHaveBeenCalledWith(page)
  })

  test('renders pagination controls', () => {
    const count = 2
    const fetchData = jest.fn()
    const page = 0

    render(
      <ReactTable
        data={data}
        columns={columns}
        count={count}
        fetchData={fetchData}
        page={page}
      />
    )

    expect(screen.getByText('<<')).toBeInTheDocument()
    expect(screen.getByText('<')).toBeInTheDocument()
    expect(screen.getByText('>')).toBeInTheDocument()
    expect(screen.getByText('>>')).toBeInTheDocument()
  })

  test('disables pagination buttons based on page count', () => {
    const count = 2
    const fetchData = jest.fn()
    const page = 0

    render(
      <ReactTable
        data={data}
        columns={columns}
        count={count}
        fetchData={fetchData}
        page={page}
      />
    )

    expect(screen.getByText('<')).toBeDisabled()
    expect(screen.getByText('<<')).toBeDisabled()
  })
})
