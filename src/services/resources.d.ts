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
  archetype: string;
  atk?: number;
  attribute?: string;
  card_images: CardImage[];
  card_prices: CardPrice[];
  card_sets: CardSet[];
  def?: number;
  desc: string;
  id: number | string;
  level?: number;
  name: string;
  race: string;
  type: CardTypes;
}

export interface Options {
  num?: number | string;
  offset?: number | string;
  fname?: string;
  level?: number | string;
  sort?: string;
  order?: "asc" | "desc" | string;
  attribute?: string;
}

export interface Response<T> {
  data: T;
  meta: Meta;
}

export type CardTypes =
  | "Spell Card"
  | "Normal Monster"
  | "Effect Monster"
  | "Flip Effect Monster"
  | "Trap Card"
  | "Fusion Monster"
  | "Union Effect Monster"
  | "Pendulum Effect Monster"
  | "Link Monster"
  | "Synchro Tuner Monster";

export interface Deck {
  cards: Card[];
  description: string;
  id: string;
  name: string;
}
