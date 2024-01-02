import React from 'react';

const Frame = ({ url }: { url: string }) => {
  // Memeriksa apakah url ada sebelum mencoba melakukan penggantian
  if (!url) {
    return <div>Tunggu sebentar...</div>;
  }

  // Mengganti bagian url yang diinginkan
  const modifiedUrl = url.replace('/stream/?id=', '/stream/hd/?id=');

  return <iframe src={modifiedUrl} height={200} allowFullScreen></iframe>;
};

export default Frame;
