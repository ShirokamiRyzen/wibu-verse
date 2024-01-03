import React from 'react';

const Frame = ({ url }: { url: string }) => {
  // Memeriksa apakah url ada sebelum mencoba melakukan penggantian
  if (!url) {
    return <div>Tunggu sebentar...</div>;
  }

  // Mengganti bagian url yang diinginkan
  let modifiedUrl = url;

  if (url.includes('/desudesu/?id=')) {
    modifiedUrl = url.replace('/desudesu/?id=', '/desudesuhd/?id=');
  } else if (url.includes('/stream/?id=')) {
    modifiedUrl = url.replace('/stream/?id=', '/stream/hd/?id=');
  } else if (url.includes('/beta/stream/?id=')) {
    modifiedUrl = url.replace('/beta/stream/?id=', '/beta/stream/hd/?id=');
  } else if (url.includes('/beta/stream2/?id=')) {
    modifiedUrl = url.replace('/beta/stream2/?id=', '/beta/stream2/hd/?id=');
  }

  return <iframe src={modifiedUrl} height={200} allowFullScreen></iframe>;
};

export default Frame;
