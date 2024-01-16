import { PureComponent } from 'react';
import { Table, Tag } from 'antd';
import { formatDate } from '@lib/date';

interface IProps {
  dataSource: [];
  rowKey: string;
  loading: boolean;
  pagination: {};
  onChange: Function;
}

export class TableListEarning extends PureComponent<IProps> {
  render() {
    const columns = [
      {
        title: 'Transaction ID',
        dataIndex: 'transactionId'
      },
      {
        title: 'Transaction Date',
        dataIndex: 'createdAt',
        sorter: true,
        render(createdAt: Date) {
          return <span>{formatDate(createdAt)}</span>;
        }
      },
      {
        title: 'User Name',
        dataIndex: 'userInfo',
        key: 'user',
        sorter: true,
        render(data, record) {
          return (
            <div>
              {record.userInfo && record.userInfo && record.userInfo.username}
              {/* <br />
              {record.userInfo && record.userInfo && record.userInfo.email} */}
            </div>
          );
        }
      },
      {
        title: 'Model Name',
        dataIndex: 'performerInfo',
        key: 'performer',
        sorter: true,
        render(data, record) {
          return (
            <div>
              {record.performerInfo && record.performerInfo && record.performerInfo.username}
              {/* <br />
              {record.performerInfo && record.performerInfo && record.performerInfo.email} */}
            </div>
          );
        }
      },
      {
        title: 'Transaction Type',
        dataIndex: 'type',
        sorter: true,
        render(type: string) {
          switch (type) {
            case 'monthly_subscription':
              return <Tag color="red">Monthly Subscription</Tag>;
            case 'yearly_subscription':
              return <Tag color="red">Yearly Subscription</Tag>;
            case 'sale_video':
              return <Tag color="#FFCF00">PPV Purchase</Tag>;
            case 'digital':
              return <Tag color="blue">Digital Product</Tag>;
            case 'physical':
              return <Tag color="blue">Physical Product</Tag>;
            case 'stream_private':
              return <Tag color="yellow">Private Show</Tag>;
            case 'tip':
              return <Tag color="magenta">Tip</Tag>;
            default:
              return <Tag color="#936dc9">{type}</Tag>;
          }
        }
      },
      {
        title: 'Gross price',
        dataIndex: 'grossPrice',
        sorter: true,
        render(data, record) {
          return (
            <span>
              $
              {(record.grossPrice && record.grossPrice.toFixed(2)) || 0}
            </span>
          );
        }
      },
      {
        title: 'Admin Commission %',
        dataIndex: 'commission',
        sorter: true,
        render(data, record) {
          return (
            <span>
              {record.commission * 100}
              %
            </span>
          );
        }
      },
      {
        title: 'Net Price',
        dataIndex: 'netPrice',
        sorter: true,
        render(data, record) {
          return (
            <span>
              $
              {(record.grossPrice - record.netPrice).toFixed(2)}
            </span>
          );
        }
      },
      {
        title: 'Payment method',
        dataIndex: 'paymentMethod',
        render(paymentGateway) {
          switch (paymentGateway) {
            case 'ccbill':
              return <Tag color="default">CCBill</Tag>;
            case 'verotel':
              return <Tag color="default">Verotel</Tag>;
            case 'wallet':
              return <Tag color="default">Wallet</Tag>;
            default: return <Tag color="default">{paymentGateway}</Tag>;
          }
        }
      },
      {
        title: 'Payment status',
        dataIndex: 'paymentStatus',
        render(status) {
          switch (status) {
            case 'paid': case 'success':
              return <Tag color="success">Success</Tag>;
            case 'pending': case 'created':
              return <Tag color="warning">Created</Tag>;
            case 'cancelled':
              return <Tag color="danger">Cancelled</Tag>;
            case 'chargeback':
              return <Tag color="danger">Chargeback</Tag>;
            default:
              return <Tag color="default">{status}</Tag>;
          }
        }
      },
      {
        title: 'Payout status',
        dataIndex: 'payoutStatus',
        render(payoutStatus: string) {
          switch (payoutStatus) {
            case 'done':
              return <Tag color="green">Paid</Tag>;
            case 'pending':
              return <Tag color="red">Unpaid</Tag>;
            case 'rejected':
              return <Tag color="red">Rejected</Tag>;
            default:
              return <Tag color="red">{payoutStatus}</Tag>;
          }
        }
      }
    ];
    const {
      dataSource, rowKey, loading, pagination, onChange
    } = this.props;
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
