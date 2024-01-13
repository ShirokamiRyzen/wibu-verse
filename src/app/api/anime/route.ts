import { useFetch } from '@/fetcher/useFetch';
import { NextRequest, NextResponse } from 'next/server';
import cheerio from 'cheerio';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');

  if (!search) {
    return NextResponse.json({ msg: 'Search query not found' }, { status: 400 });
  }
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, status } = await useFetch(`https://otakudesu.media/?s=${search}&post_type=anime`);

    if (status !== 200) throw new Error(`Error ${status}`);

    const $ = cheerio.load(data);
    const $parentList = $('#venkonten > div > div.venser > div > div > ul > li');

    const list = $parentList
      .map((_i, el) => {
        const id = $(el).find('h2 > a').attr('href')?.split('/')?.[4];
        const title = $(el).find('h2 > a').text().trim();
        const thumbnail = $(el).find('img').attr('src');
        const genres = $(el)
          .find('div:nth-child(3) > a')
          .map((_i, el) => $(el).text().trim())
          .get();

        return {
          id,
          title,
          thumbnail,
          genres,
        };
      })
      .get();

    return NextResponse.json({ status: 200, succes: true, data: list }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
};
