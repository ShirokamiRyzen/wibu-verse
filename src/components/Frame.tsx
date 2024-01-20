import React, { useEffect, useRef } from 'react';

const Frame = ({ url }: { url: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        try {
          const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (iframeDoc) {
            const adsElement = iframeDoc.querySelector('.box_item_ads_popup');
            if (adsElement) {
              adsElement.remove();
            }
          }
        } catch (error) {
          console.error('Error accessing iframe contents:', error);
        }
      };
    }
  }, [url]);

  return <iframe ref={iframeRef} src={url} width={480} height={240} allowFullScreen></iframe>;
};

export default Frame;
