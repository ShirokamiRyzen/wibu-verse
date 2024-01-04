import React from 'react';

const Frame = ({ url }: { url: string }) => {

  return <iframe src={url} height={200} allowFullScreen></iframe>;
};

export default Frame;
