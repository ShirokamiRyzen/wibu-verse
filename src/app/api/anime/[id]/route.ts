import { useFetch } from '@/fetcher/useFetch';
import { NextRequest, NextResponse } from 'next/server';
import cheerio from 'cheerio';

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
  const { id } = context.params;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, status } = await useFetch(`https://otakudesu.media/anime/${id}`);
    if (status !== 200) throw new Error(`Error ${status}`);

    const $ = cheerio.load(data);
    const $parentInfo = $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p');
    const $parentListLink = $('#venkonten > div.venser > div:nth-child(8) > ul > li');
    const title = $('#venkonten > div.venser > div.jdlrx > h1').text().replace('Subtitle Indonesia', '').trim();
    const thumbnail = $('#venkonten > div.venser > div.fotoanime > img').attr('src');
    const info = $parentInfo
      .map((_i, el) => {
        const value = $(el).find('span').text().trim();
        return value;
      })
      .get();

    const links = $parentListLink
      .map((_i, el) => {
        const title = $(el).find('span:nth-child(1) > a').text().trim();
        const id = $(el).find('span:nth-child(1) > a').attr('href')?.split('/')?.[4];
        const release = $(el).find('span:nth-child(2)').text().trim().replace(',', ' ');

        return {
          id,
          title,
          release,
        };
      })
      .get();

    const slug = id;

    // Menambahkan slug ke dalam respons JSON
    const responseData = { title, thumbnail, info, links, slug };
    return NextResponse.json({ status: 200, succes: true, data: responseData }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
};
