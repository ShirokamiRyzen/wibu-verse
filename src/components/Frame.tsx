import React from 'react';

const Frame = ({ url }: { url: string }) => {

  return <iframe src={url} width={480} height={240} allowFullScreen></iframe>;
};

export default Frame;
