import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination, useRowSelect, useExpanded, useSortBy, useGlobalFilter } from 'react-table';
import ReactTable from 'react-table';
import { fetchProducts } from '../features/product/productSlice';
import Checkbox from './Checkbox';
import './table.css';
import GlobalFilter from './GlobalFilter';

const COLUMNS = [
  {
    Header: () => null,
    id: 'expander',
    Cell: ({ row }) => (
      <span {...row.getToggleRowExpandedProps()}>
        {row.isExpanded ?
          <i className="fa fa-minus-circle fa-lg" style={{ color: 'red', size: 26 }} size={26}></i> :
          <i className="fa fa-plus-circle fa-lg" style={{ color: 'green', size: 26 }} size={26}></i>
        }
      </span>
    )
  },
  {
    Header: 'Title',
    accessor: 'title',
    sortType: compareString
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Discount %',
        accessor: 'discountPercentage',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
    ]
  },
  {
    Header: 'Description',
    accessor: 'description',
    show: false,
  },
  {
    Header: 'Brand',
    accessor: 'brand',
    show: false,
  },
  {
    Header: 'Category',
    accessor: 'category',
    show: false,
  },
  {
    Header: 'Rating',
    accessor: 'rating',
    show: false,
  },
  {
    Header: 'Stock',
    accessor: 'stock',
    show: false,
  },

]

function compareString(rowA, rowB, id, desc) {
  return rowA.values[id].localeCompare(rowB.values[id]);
}

const Table = () => {
  const products = useSelector(state => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])



  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => products, [products]);

  const hiddenColumns = columns
    .filter(col => col.show === false)
    .map(col => col.accessor)

  const tableInstance = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns
    },
    autoResetSelectedRows: false,
    autoResetSelectedCell: false,
    autoResetSelectedColumn: false,
  },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => {
            return <Checkbox {...row.getToggleRowSelectedProps()} />;
          },
        },
        ...columns,
      ])
    }
  )
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    page,
    previousPage,
    nextPage,
    state,
    setGlobalFilter,
    pageOptions,
    headerGroups,
    canNextPage,
    canPreviousPage,
    visibleColumns,
  } = tableInstance;
  const { pageIndex, globalFilter } = state;

  const renderTableHeaders = () => {
    return (
      <thead>
        {
          headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
    )
  }

  const renderSubComponent = (row) => {
    return (
      <>{hiddenColumns.map(col => {
        return (
          <tr style={{ padding: 20, }}>
            <td style={{ width: 400 }}>{col + ' : '}</td>
            <td>{row.values[col]}</td>
          </tr>
        )
      })}</>
    )
  }

  const renderTableBody = () => {
    return (
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row)
          return (
            <>
              <tr {...row.getRowProps()}>
                {
                  row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })
                }
              </tr>
              {row.isExpanded && (
                <tr style={{ margin: 30 }}>
                  <td colSpan={visibleColumns.length} style={{ padding: 30 }}>
                    {renderSubComponent(row)}
                  </td>
                </tr>
              )}
            </>
          )
        })}

      </tbody>
    )
  }

  const renderPagination = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
        <span>Page  <strong>{pageIndex + 1} of {pageOptions.length}</strong>{'  '}</span>
        <button onClick={() => previousPage()} style={{ marginRight: 20 }} disabled={!canPreviousPage}>Previous</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
      </div>
    )
  }

  const renderGlobalFilter = () => {
    return <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}></GlobalFilter>
  }

  return (
    <>
      {renderGlobalFilter()}
      <table {...getTableProps()}>
        {renderTableHeaders()}
        {renderTableBody()}
      </table>

      {renderPagination()}
    </>
  )
}

export default Table;