import { ConfigProvider, Table as TableConmponent } from 'antd';
const Table = ({ columns, data,width }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#f3f3f9"
          },
        },
      }}
    >
      <TableConmponent scroll={{ x: width ,y:null}} columns={columns} dataSource={data} />
    </ConfigProvider>
  )
}

export default Table;