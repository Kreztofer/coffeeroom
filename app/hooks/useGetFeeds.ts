import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const useGetFeeds = () => {
  const [feeds, setFeeds] = useState([]);

  const fetcher = useCallback(async () => {
    try {
      const {
        data: { data },
      } = await axios.get('http://localhost:3000/api/feeds');

      console.log(data);
      setFeeds(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetcher();
  }, [fetcher]);

  return { feeds };
};

export default useGetFeeds;
