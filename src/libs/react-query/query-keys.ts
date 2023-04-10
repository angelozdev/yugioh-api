const queryKeys = {
  decks: {
    details: (id: string) => ["decks", id],
    list: <T>(params?: T) => ["decks", params],
  },
  cards: {
    details: (id: string) => ["cards", id],
    list: <T>(params?: T) => ["cards", params],
  },
};

export default queryKeys;
