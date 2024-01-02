import React from 'react';

const Frame = ({ url }: { url: string }) => {
  // Memeriksa apakah url ada sebelum mencoba melakukan penggantian
  if (!url) {
    return <div>Tunggu sebentar...</div>;
  }

  // Mengganti bagian url yang diinginkan
  let modifiedUrl = url;

  if (url.includes('https://desustream.me/desudesu/?id=')) {
    modifiedUrl = url.replace('https://desustream.me/desudesu/?id=', 'https://desustream.me/desudesuhd/?id=');
  } else if (url.includes('https://desustream.me/stream/?id=')) {
    modifiedUrl = url.replace('https://desustream.me/stream/?id=', 'https://desustream.me/stream/hd/?id=');
  } else if (url.includes('https://desustream.me/beta/stream/?id=')) {
    modifiedUrl = url.replace('https://desustream.me/beta/stream/?id=', 'https://desustream.me/beta/stream/hd/?id=');
  }

  return <iframe src={modifiedUrl} height={200} allowFullScreen></iframe>;
};

export default Frame;
