/* eslint-disable react/require-default-props */
// @ts-nocheck
// @ts-ignore
import { PureComponent } from 'react';
import { Avatar, Table, Tag } from 'antd';
import {
  EditOutlined, DeleteOutlined, CameraOutlined, FileImageOutlined, VideoCameraOutlined, SkinOutlined
} from '@ant-design/icons';
import { formatDate } from '@lib/date';
import Link from 'next/link';
import { DropdownAction } from '@components/common/dropdown-action';

interface IProps {
  dataSource: [];
  rowKey: string;
  loading: boolean;
  pagination: {};
  onChange: Function;
  deletePerformer?: Function;
}

export class TableListVideo extends PureComponent<IProps> {
  render() {
    const {
      dataSource, rowKey, loading, pagination, onChange, deletePerformer
    } = this.props;

    const columns = [
      {
        title: '#',
        dataIndex: 'avatar',
        render(avatar) {
          return <Avatar src={avatar || '/no-avatar.png'} />;
        }
      },
      {
        title: 'Display name',
        dataIndex: 'name'
      },
      {
        title: 'Username',
        dataIndex: 'username'
      },
      {
        title: 'Email address',
        dataIndex: 'email'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        render(status) {
          switch (status) {
            case 'active':
              return <Tag color="green">Active</Tag>;
            case 'inactive':
              return <Tag color="red">Inactive</Tag>;
            case 'pending-email-confirmation':
              return <Tag color="default">Pending</Tag>;
            default: return <Tag color="default">{status}</Tag>;
          }
        }
      },
      {
        title: 'Verified Email?',
        dataIndex: 'verifiedEmail',
        render(status) {
          switch (status) {
            case true:
              return <Tag color="green">Y</Tag>;
            case false:
              return <Tag color="red">N</Tag>;
            default: return <Tag color="default">{status}</Tag>;
          }
        }
      },
      {
        title: 'Verified ID?',
        dataIndex: 'verifiedDocument',
        render(status) {
          switch (status) {
            case true:
              return <Tag color="green">Y</Tag>;
            case false:
              return <Tag color="red">N</Tag>;
            default: return <Tag color="default">{status}</Tag>;
          }
        }
      },
      {
        title: 'Updated on',
        dataIndex: 'updatedAt',
        sorter: true,
        render(date: Date) {
          return <span>{formatDate(date)}</span>;
        }
      },
      {
        title: '#',
        dataIndex: '_id',
        render(id: string) {
          return (
            <DropdownAction
              menuOptions={[
                {
                  key: 'update',
                  name: 'Update',
                  children: (
                    <Link
                      legacyBehavior
                      href={{
                        pathname: '/performer/update',
                        query: { id }
                      }}
                    >
                      <a>
                        <EditOutlined />
                        {' '}
                        Update
                      </a>
                    </Link>
                  )
                },
                {
                  key: 'photo',
                  name: 'Photos',
                  children: (
                    <Link
                      legacyBehavior
                      href={{
                        pathname: '/photos',
                        query: { performerId: id, breadcrumb: 'performer' }
                      }}
                    >
                      <a>
                        <CameraOutlined />
                        {' '}
                        Photos
                      </a>
                    </Link>
                  )
                },
                {
                  key: 'gallery',
                  name: 'Galleries',
                  children: (
                    <Link
                      legacyBehavior
                      href={{
                        pathname: '/gallery',
                        query: { performerId: id, breadcrumb: 'performer' }
                      }}
                    >
                      <a>
                        <FileImageOutlined />
                        {' '}
                        Galleries
                      </a>
                    </Link>
                  )
                },
                {
                  key: 'video',
                  name: 'Videos',
                  children: (
                    <Link
                      legacyBehavior
                      href={{
                        pathname: '/video',
                        query: { performerId: id, breadcrumb: 'performer' }
                      }}
                    >
                      <a>
                        <VideoCameraOutlined />
                        {' '}
                        Videos
                      </a>
                    </Link>
                  )
                },
                {
                  key: 'product',
                  name: 'Products',
                  children: (
                    <Link
                      legacyBehavior
                      href={{
                        pathname: '/product',
                        query: { performerId: id, breadcrumb: 'performer' }
                      }}
                    >
                      <a>
                        <SkinOutlined />
                        {' '}
                        Products
                      </a>
                    </Link>
                  )
                },
                {
                  key: 'delete',
                  name: 'Delete',
                  children: (
                    <div>
                      <DeleteOutlined />
                      {' '}
                      Delete
                    </div>
                  ),
                  onClick: () => deletePerformer && deletePerformer(id)
                }
              ]}
            />
          );
        }
      }
    ];

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={rowKey}
        loading={loading}
        pagination={pagination}
        onChange={onChange.bind(this)}
      />
    );
  }
}
