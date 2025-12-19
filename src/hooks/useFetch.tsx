import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import type { Query } from '../types/entities/query.type';

interface IProps {
  query?: Query;
  thunk: any;
  options: {
    selector?: any;
    resetFn?: any;
    skip?: boolean;
  };
}
export const useFetch = <T,>({
  query,
  thunk,
  options: { selector, skip = false, resetFn },
}: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const queryRef = useRef<Query | undefined>(query);

  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reduxState = useSelector(selector as any) as any;

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const {
    data: reduxData,
    loading: reduxLoading,
    error: reduxError,
  } = reduxState;

  // Sync Redux → local state whenever Redux updates
  useEffect(() => {
    if (!reduxData) return;
    setData(reduxData);
    resetFn && dispatch(resetFn());
  }, [reduxData]);

  useEffect(() => {
    setLoading(reduxLoading);
  }, [reduxLoading]);

  useEffect(() => {
    setError(reduxError);
    resetFn && dispatch(resetFn());
  }, [reduxError]);

  // Auto dispatch on mount or query change
  useEffect(() => {
    if (!skip && query !== undefined) {
      dispatch(thunk(query));
    }
  }, [dispatch, thunk, JSON.stringify(query), skip]);

  // Manual refetch
  const refetch = useCallback(() => {
    dispatch(thunk(query));
  }, [dispatch, thunk, query]);

  return {
    data,
    setData,
    loading,
    error,
    refetch,
  };
};
