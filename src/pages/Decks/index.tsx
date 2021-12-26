import { useState } from "react";
import { useNavigate } from "react-router-dom";

// utils
import { useDeckQuery } from "hooks";
import { useDeckContext } from "contexts/deck";

// components
import { Spin } from "components/icons";

// types
import type { FormEvent } from "react";

function Decks() {
  const navigate = useNavigate();
  const { setDeckId } = useDeckContext();
  const [value, setValue] = useState("fUCAw3WlzoN54yWQMK7M");
  const deckQuery = useDeckQuery(value, { enabled: false });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    deckQuery
      .refetch()
      .then((deck) => {
        if (!deck.data || !deck.data?.id) throw new Error("Deck not found");
        setDeckId(deck.data.id);
        navigate(`/decks/${deck.data.id}`);
      })
      .catch(console.error);
  };

  return (
    <section>
      <div className="container my-4">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold mb-4">Decks</h1>

          <label className="flex flex-col">
            <span>Enter a Deck ID</span>
            <input
              className="disabled:opacity-50 border py-2 px-4 focus:shadow-lg max-w-full cursor-text rounded-none"
              type="text"
              placeholder="as7d8sjsda82dh9"
              onChange={(event) => setValue(event.target.value)}
              value={value}
              disabled={deckQuery.isFetching}
            />
          </label>

          <button
            type="submit"
            disabled={!value || deckQuery.isFetching}
            className="disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all focus:bg-slate-100 border py-2 px-4 uppercase cursor-pointer rounded-none mt-4"
          >
            {deckQuery.isFetching ? <Spin /> : "SEARCH"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Decks;
