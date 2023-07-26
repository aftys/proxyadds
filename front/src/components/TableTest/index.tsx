import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

// type DataType = {
//   name: string;
//   age: number;
//   address: string;
// };

// type DataIndex = 'name' | 'age' | 'address';
    
// type Props = {
//   columns: ColumnsType<DataType>;
// };

type Props<DataType extends object> = {
    columns: ColumnsType<DataType>;
    data: DataType[];
  };
  
//   type DataIndex<DataType> = keyof DataType;

// const TableGridTest: React.FC<Props> = ({ columns }) => {
const TableGridTest = <DataType extends object>({ columns, data }: Props<DataType>, {DataIndex}:any) => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);


  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: number | string | (string & {}),
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex as string);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
      sorter: (a, b) => {
        const aValue = a[dataIndex];
        const bValue = b[dataIndex];
  
        // Check if age is a string or a number
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        } else {
          // Convert to numbers for comparison
          return Number(aValue) - Number(bValue);
        }
      },
  });

  const tableColumns = columns.map((col) => {
    if (col.dataIndex) {
      return {
        ...col,
        ...getColumnSearchProps(col.dataIndex as DataIndex),

      };
    }
    return col;
  });

  return (
    <Table
      className="dark:border-0 border-gray-200 border dark:bg-dark-bg-main max-w-screen-md w-full rounded-md overflow-hidden"
      pagination={{ pageSize: 6}}
      columns={tableColumns}
      dataSource={data}
    />
  );
};

export default TableGridTest;
