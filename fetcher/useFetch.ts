import axios from 'axios';
import https from 'https';

interface Payload {
  id: number;
  i: number;
  q: string;
  nonce?: 'b27b5f0c46';
  action?: '2a3505c93b0035d3f455df82bf976b84';
}

export const useFetch = async (url: string, method: string = 'GET', pyld?: Payload) => {
  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    if (method === 'POST') {
      const from = new FormData();
      from.append('id', String(pyld?.id));
      from.append('i', String(pyld?.i));
      from.append('q', String(pyld?.q));
      from.append('nonce', 'b27b5f0c46');
      from.append('action', '2a3505c93b0035d3f455df82bf976b84');

      // console.log(JSON.stringify(from));
      const response = await axios.post(url, from, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for sending FormData
        },
      });

      console.log(response.status);
      return {
        data: response.data,
        status: response.status,
      };
    }

    const response = await fetch(url, { method, next: { revalidate: 10 } });

    const data = await response.text();
    return {
      data,
      status: response.status,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};
