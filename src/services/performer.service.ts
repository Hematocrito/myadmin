import { getGlobalConfig } from 'src/services';
import { APIRequest } from './api-request';

export class PerformerService extends APIRequest {
  create(payload: any) {
    return this.post('/admin/performers', payload);
  }

  update(id: string, payload: any) {
    return this.put(`/admin/performers/${id}`, payload);
  }

  delete(id: string) {
    return this.del(`/performers/${id}`);
  }

  search(query?: { [key: string]: any }) {
    return this.get(this.buildUrl('/admin/performers/search', query));
  }

  findById(id: string) {
    return this.get(`/admin/performers/${id}/view`);
  }

  getUploadDocumentUrl() {
    return `${getGlobalConfig().NEXT_PUBLIC_API_ENDPOINT}/admin/performers/documents/upload`;
  }

  getAvatarUploadUrl() {
    return `${getGlobalConfig().NEXT_PUBLIC_API_ENDPOINT}/admin/performers/avatar/upload`;
  }

  getCoverUploadUrl() {
    return `${getGlobalConfig().NEXT_PUBLIC_API_ENDPOINT}/admin/performers/cover/upload`;
  }

  updatePaymentGatewaySetting(id: string, payload: any) {
    return this.put(`/admin/performers/${id}/payment-gateway-settings`, payload);
  }

  updateCommissionSetting(id: string, payload: any) {
    return this.put(`/admin/performers/${id}/commission-settings`, payload);
  }

  updateBankingSetting(id: string, payload: any) {
    return this.put(`/admin/performers/${id}/banking-settings`, payload);
  }

  getRankingModels() {
    return this.get('/admin/ranking-performers');
  }

  deleteRanking(id) {
    return this.del(`/admin/ranking-performers/${id}`);
  }

  createRanking(payload) {
    return this.post('/admin/ranking-performers', payload);
  }

  updateRanking(id, payload) {
    return this.put(`/admin/ranking-performers/${id}`, payload);
  }
}

export const performerService = new PerformerService();
