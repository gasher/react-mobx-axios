import React from 'react';
import Image from './Image';

const LoadingIndicator = ({ size }) => (
  <Image name="loading" width={size} height={size} alt="loading" />
);

export default LoadingIndicator;
