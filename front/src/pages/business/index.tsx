import React from 'react';
import TableGridTest from '../../components/TableTest';
const MyComponent: React.FC = () => {
    type MyData = {
        // id: number;
        name: string;
        age: number;
        address: string;
        // Add more properties as needed...
        number: number;
      };

      
  const customColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      className: 'dark:bg-dark-bg-main dark:text-gray-300',
      // Add other custom properties if needed...
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      className: 'dark:bg-dark-bg-main dark:text-gray-300',
      // Add other custom properties if needed...
    },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        className: 'dark:bg-dark-bg-main dark:text-gray-300',
        
        
      },
      {
        title: 'number',
        dataIndex: 'number',
        key: 'number',
        className: 'dark:bg-dark-bg-main dark:text-gray-300',
        
        
      },
    // Add other custom columns as needed...
  ];


  const data: MyData[] = [
    {
        
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        number: 1,
      },
      {
        
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
        number: 2,
      },
      {
        
        name: 'Jim Green',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        number: 3,
      },{
        
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        number: 4,
      },
      {
        
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
        number: 4,
    
      },
      {
        
        name: 'Jim Green',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        number: 4,
    
      },{
        
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        number: 4,
    
      },
      {
        
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
        number: 4,
      },
      {
        
        name: 'Jim Green',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        number: 4,
      },{
        
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        number: 4,
    
      },
      {
        
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
        number: 5,
    
      }
    ];
  

//   return <TableGridTest columns={customColumns} />;
return <TableGridTest<MyData> columns={customColumns} data={data} />;

};

export default MyComponent;
