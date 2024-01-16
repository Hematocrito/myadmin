// @ts-nocheck
// @ts-ignore
import { Table, Tag } from 'antd';
import { IToken } from 'src/interfaces/wallet-package';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { DropdownAction } from '@components/common/dropdown-action';

interface IProps {
  dataSource: IToken[];
  pagination: {};
  rowKey: string;
  onChange(): Function;
  loading: boolean;
  deleteToken: Function;
}

export function TableListToken({
  dataSource, pagination, rowKey, onChange, loading, deleteToken
}: IProps) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render(price) {
        return (
          <span>
            $
            {price}
          </span>
        );
      }
    },
    {
      title: 'Amount added to Wallet',
      dataIndex: 'token'
    },
    {
      title: 'Ordering',
      dataIndex: 'ordering'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render(status: string) {
        if (status === 'active') {
          return <Tag color="green">Active</Tag>;
        }
        return <Tag color="red">Inactived</Tag>;
      }
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id: string) => (
        <DropdownAction
          menuOptions={[
            {
              key: 'update',
              name: 'Update',
              children: (
                <Link
                  legacyBehavior
                  href={{
                    pathname: '/wallet-package/update',
                    query: { id }
                  }}
                  as={`/wallet-package/update?id=${id}`}
                >
                  <a>
                    <EditOutlined />
                    Update
                  </a>
                </Link>
              )
            },
            {
              key: 'delete',
              name: 'Delete',
              children: (
                <span>
                  <DeleteOutlined />
                  Delete
                </span>
              ),
              onClick: () => deleteToken && deleteToken(id)
            }
          ]}
        />
      )
    }
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={rowKey}
      pagination={pagination}
      onChange={onChange}
      loading={loading}
    />
  );
}
