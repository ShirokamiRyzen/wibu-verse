export type Link = {
  id: string;
  title: string;
  release: string;
};

export type DetailAnime = {
  title: string;
  thumbnail: string;
  info: string[];
  links: Link[];
};
