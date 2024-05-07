import type { LoadingProps } from './Loading.types';

import React, { useMemo } from 'react';
import {
  BounceLoader,
  CircleLoader,
  ClipLoader,
  FadeLoader,
  GridLoader,
  MoonLoader,
  PuffLoader,
  ScaleLoader,
} from 'react-spinners';
import './_loading.scss';

export const Loading = ({ type }: LoadingProps) => {
  const LoaderComponent = useMemo(() => {
    switch (type) {
      case 'circle':
        return CircleLoader;
      case 'clip':
        return ClipLoader;
      case 'fade':
        return FadeLoader;
      case 'grid':
        return GridLoader;
      case 'moon':
        return MoonLoader;
      case 'puff':
        return PuffLoader;
      case 'scale':
        return ScaleLoader;

      default:
        return BounceLoader;
    }
  }, [type]);

  return (
    <div className="loading__container">
      <LoaderComponent color="#006DAA" />
    </div>
  );
};
