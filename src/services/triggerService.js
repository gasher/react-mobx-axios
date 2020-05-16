import client from './client';

class TriggerService {
  getAll(params) {
    console.log(params);
    return client.request({
      method: 'get',
      url: '/triggers/',
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    });
  }
}

export default new TriggerService();
