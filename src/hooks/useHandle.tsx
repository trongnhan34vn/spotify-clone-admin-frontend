import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { useEffect, useState } from 'react';

interface IProps {
  thunk: any;
  options: {
    selector: any;
    resetFn: any;
  };
}
export const useHandle = ({
  thunk,
  options: { selector, resetFn },
}: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: reduxData,
    error: reduxError,
    loading: reduxLoading,
  } = useSelector(selector) as any;
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const execute = (...args: any) => {
    return dispatch(thunk(...args));
  };

  useEffect(() => {
    if (!reduxData) return;
    setData(reduxData);
    resetFn && dispatch(resetFn());
  }, [reduxData]);

  useEffect(() => {
    setError(reduxError);
    resetFn && dispatch(resetFn());
  }, [reduxError]);

  useEffect(() => {
    setLoading(reduxLoading);
  }, [reduxLoading]);

  return { execute, data, error, loading };
};
