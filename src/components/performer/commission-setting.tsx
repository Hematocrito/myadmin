import { PureComponent } from 'react';
import {
  Form, Button, message, InputNumber
} from 'antd';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const validateMessages = {
  required: 'This field is required!'
};

const dataSource = [
  { name: 'monthlySubscriptionCommission', label: 'Monthly Subscription' },
  { name: 'yearlySubscriptionCommission', label: 'Yearly Subscription' },
  { name: 'videoSaleCommission', label: 'Video sale commission' },
  { name: 'productSaleCommission', label: 'Product sale commission' },
  { name: 'privateChatCommission', label: 'Private chat commission' },
  { name: 'tokenTipCommission', label: 'Wallet tip  commission' }
];

interface IProps {
  onFinish: Function;
  // eslint-disable-next-line react/require-default-props
  commissionSetting?: any;
  // eslint-disable-next-line react/require-default-props
  submiting?: boolean;
}

export class CommissionSettingForm extends PureComponent<IProps> {
  render() {
    const { commissionSetting, onFinish, submiting } = this.props;
    return (
      <Form
        {...layout}
        layout="vertical"
        name="form-performer"
        onFinish={onFinish.bind(this)}
        onFinishFailed={() => message.error('Please complete the required fields.')}
        validateMessages={validateMessages}
        initialValues={commissionSetting}
      >
        {dataSource.map((data) => (
          <Form.Item name={data.name} label={data.label} initialValue={0.01}>
            <InputNumber min={0.01} max={0.99} style={{ width: '100%' }} step={0.01} />
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
          <Button type="primary" htmlType="submit" disabled={submiting} loading={submiting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
