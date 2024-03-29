// @ts-nocheck
// @ts-ignore
import React, { PureComponent } from 'react';
import {
  message, Layout, Col, Divider, Row, Statistic
} from 'antd';
import Head from 'next/head';
import PayoutRequestList from 'src/components/payout-request/table';
import { SearchFilter } from '@components/common/search-filter';
import Page from '@components/common/layout/page';
import { getResponseError } from '@lib/utils';
import { payoutRequestService } from '@services/index';
import { BreadcrumbComponent } from '@components/common';

interface IProps {
}

class PerformerPayoutRequestPage extends PureComponent<IProps> {
  state = {
    items: [],
    loading: false,
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0
    } as any,
    sort: 'desc',
    sortBy: 'updatedAt',
    filter: {},
    statsPayout: {
      totalPrice: 0,
      paidPrice: 0,
      unpaidPrice: 0
    }
  };

  componentDidMount() {
    this.getData();
    this.getStatsPayout();
  }

  async handleFilter(values) {
    const { filter } = this.state;
    if (values.performerId) {
      // eslint-disable-next-line no-param-reassign
      values.sourceId = values.performerId;
      // eslint-disable-next-line no-param-reassign
      delete values.performerId;
    }
    await this.setState({ filter: { ...filter, ...values } });
    this.getData();
  }

  async handleTabChange(data) {
    const { pagination } = this.state;
    await this.setState({
      pagination: { ...pagination, current: data.current }
    });
    this.getData();
  }

  async getStatsPayout() {
    try {
      const resp = await payoutRequestService.statsAll();
      this.setState({
        statsPayout: resp.data
      });
    } catch (e) {
      const err = await Promise.resolve(e);
      message.error(getResponseError(err));
    } finally {
      this.setState({ loading: false });
    }
  }

  async getData() {
    try {
      const {
        filter, sort, sortBy, pagination
      } = this.state;
      await this.setState({ loading: true });
      const resp = await payoutRequestService.search({
        ...filter,
        sort,
        sortBy,
        limit: pagination.pageSize,
        offset: (pagination.current - 1) * pagination.pageSize
      });
      await this.setState({
        items: resp.data.data,
        pagination: { ...pagination, total: resp.data.total }
      });
    } catch (error) {
      message.error(
        getResponseError(error) || 'An error occured. Please try again.'
      );
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      pagination, items, loading, statsPayout
    } = this.state;

    return (
      <Layout>
        <Head>
          <title>Payout Requests</title>
        </Head>
        <BreadcrumbComponent breadcrumbs={[{ title: 'Payout Requests' }]} />
        <Page>
          <div style={{ textAlign: 'center' }}>
            <p>The payout amounts requested does not account for the transaction fee of the payment processor. You can either increase your commission to account for this, or reduce the transaction fee from the payout. P.S.: Models are made aware of this through a disclaimer when they request for payouts.</p>
            <Row>
              <Col sm={8}>
                <Statistic
                  title="Model Earnings"
                  value={statsPayout?.totalPrice || 0}
                  precision={2}
                  prefix="$"
                />
              </Col>
              <Col sm={8}>
                <Statistic
                  title="Unpaid Balance"
                  value={statsPayout?.unpaidPrice || 0}
                  precision={2}
                  prefix="$"
                />
              </Col>
              <Col sm={8}>
                <Statistic
                  title="Total Paid"
                  value={statsPayout?.paidPrice || 0}
                  precision={2}
                  prefix="$"
                />
              </Col>
            </Row>
          </div>
          <Divider />
          <SearchFilter
            statuses={[
              { text: 'All status', key: '' },
              { text: 'Pending', key: 'pending' },
              { text: 'Done', key: 'done' },
              { text: 'Rejected', key: 'rejected' }
            ]}
            dateRange
            searchWithPerformer
            onSubmit={this.handleFilter.bind(this)}
          />
          <div className="table-responsive">
            <PayoutRequestList
              payouts={items}
              searching={loading}
              total={pagination.total}
              onChange={this.handleTabChange.bind(this)}
              pageSize={pagination.pageSize}
            />
          </div>
        </Page>
      </Layout>
    );
  }
}

export default PerformerPayoutRequestPage;
