/* eslint-disable jsx-a11y/label-has-associated-control */
import { PureComponent } from 'react';
import {
  Row, Col, Select, Input, DatePicker
} from 'antd';
import { SelectUserDropdown } from '@components/user/select-user-dropdown';
import { SelectPerformerDropdown } from '@components/performer/common/select-performer-dropdown';

const { RangePicker }:any = DatePicker;

interface IProps {
  onSubmit: Function;
}

const deliveryStatuses = [
  {
    key: '',
    text: 'All delivery statuses'
  },
  {
    key: 'created',
    text: 'Created'
  },
  {
    key: 'shipping',
    text: 'Shipping'
  },
  {
    key: 'delivered',
    text: 'Delivered'
  },
  {
    key: 'refunded',
    text: 'Refunded'
  }
];

export class OrderSearchFilter extends PureComponent<IProps> {
  render() {
    const { onSubmit } = this.props;
    return (
      <Row gutter={24}>
        <Col lg={6} md={8} xs={12}>
          <Input
            placeholder="Enter Order ID or Product Name"
            onChange={(evt) => this.setState({ q: evt.target.value })}
            onPressEnter={() => onSubmit(this.state, () => onSubmit(this.state))}
          />
        </Col>
        <Col lg={6} md={8} xs={12}>
          <Select
            onChange={(val) => this.setState({ deliveryStatus: val }, () => onSubmit(this.state))}
            style={{ width: '100%' }}
            placeholder="Select delivery status"
            defaultValue=""
          >
            {deliveryStatuses.map((s) => (
              <Select.Option key={s.key} value={s.key}>
                {s.text || s.key}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col lg={6} md={8} xs={12}>
          <SelectUserDropdown onSelect={(val) => {
            this.setState({
              buyerId: val
            }, () => onSubmit(this.state));
          }}
          />
        </Col>
        <Col lg={6} md={8} xs={12}>
          <SelectPerformerDropdown
            onSelect={(val) => {
              this.setState({
                sellerId: val
              }, () => onSubmit(this.state));
            }}
          />
        </Col>

        <Col lg={6} md={8} xs={12}>
          <RangePicker
            onChange={(dates: [any, any], dateStrings: [string, string]) => this.setState({ fromDate: dateStrings[0], toDate: dateStrings[1] }, () => onSubmit(this.state))}
          />
        </Col>
      </Row>
    );
  }
}
