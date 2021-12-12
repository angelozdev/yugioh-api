interface CardSet {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
}

interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
}

interface CardPrice {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
}

interface Meta {
  current_rows: number;
  next_page: string;
  next_page_offset: number;
  pages_remaining: number;
  rows_remaining: number;
  total_pages: number;
  total_rows: number;
}

export interface Card {
  id: number;
  name: string;
  type: string;
  desc: string;
  race: string;
  archetype: string;
  card_sets: CardSet[];
  card_images: CardImage[];
  card_prices: CardPrice[];
}

export interface Options {
  num?: number | string;
  offset?: number | string;
  nextPage?: string;
}

export interface Response<T> {
  data: T;
  meta: Meta;
}
