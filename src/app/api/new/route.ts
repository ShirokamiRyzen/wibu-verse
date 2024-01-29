import { useFetch } from '@/fetcher/useFetch';
import { NextRequest, NextResponse } from 'next/server';
import cheerio from 'cheerio';

export const GET = async (req: NextRequest) => {
  const pages = [1, 2, 3, 4];
  try {
    const requests = pages.map(async (page) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data, status } = await useFetch(`https://otakudesu.media/ongoing-anime/page/${page}`);

      if (status !== 200) throw new Error(`Error ${status}`);

      const $ = cheerio.load(data);
      const $parentElement = $('#venkonten > div > div.venser > div.venutama > div.rseries > div > div.venz > ul > li');

      const list = $parentElement
        .map((i, el) => {
          const title = $(el).find('div > div.thumb > a > div > h2').text();
          const thumbnail = $(el).find('div > div.thumb > a > div > img').attr('src');
          const episode = $(el).find('div > div.epz').text();
          const temp = $(el).find('div > div.thumb > a').attr('href')?.split('/');

          return {
            id: temp?.[temp.length - 2],
            title,
            thumbnail,
            episode,
          };
        })
        .get();

      return list;
    });

    const results = await Promise.all(requests);
    const mergedList = results.flat(); // Menggabungkan hasil dari semua halaman

    return NextResponse.json({ status: 200, success: true, data: mergedList }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
};
