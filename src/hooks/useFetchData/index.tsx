import {useState, useEffect} from 'react';
import {globalEnums} from '../../global';

export const useFetchData = (url: unknown) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataError, setDataError] = useState<any>();
  useEffect(() => {
    const makeRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(url as unknown as Request);
        const json = await response.json();
        setData(json?.message);
        if (json.status === globalEnums.success) {
          setLoading(false);
        }
        return () => json;
      } catch (error) {
        console.error(error);
        setDataError(error);
      }
    };
    makeRequest();
  }, [url]);
  return [data, loading, dataError];
};
