import {useState} from 'react';

export default () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const sendRequest = async <T>(promise: Promise<T>) => {
    try {
      setError('');
      setLoading(true);
      const res = await promise;
      setLoading(false);
      return await res;
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
    }
  };
  return {error, loading, sendRequest};
};
