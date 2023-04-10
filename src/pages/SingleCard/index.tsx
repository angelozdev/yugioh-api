import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// utils
import { getBadgeColor } from "utils";
import cardsServices from "services/cards";

//components
import { ArrowLeft } from "components/icons/";
import { Spinner } from "components";

// types
import type { Card } from "services/resources";
import { queryKeys } from "libs/react-query";

function SingleCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) throw new Error("No card id");

  const {
    data: card,
    isInitialLoading,
    isSuccess,
  } = useQuery<Card>(
    queryKeys.cards.details(id),
    () => cardsServices.getById(id),
    { staleTime: Infinity }
  );

  const { name, archetype, card_images: cardImages } = card || {};

  return (
    <section className="container">
      <div className="my-4">
        <button
          className="inline-flex mb-4 px-3 py-1 border rounded-sm hover:shadow"
          onClick={() => navigate("/")}
        >
          <ArrowLeft />
        </button>

        {isInitialLoading && <Spinner />}

        {isSuccess && (
          <div className="flex flex-col sm:flex-row gap-4">
            <figure className="basis-60">
              <img
                className="object-cover mx-auto"
                width={240}
                src={cardImages?.[0].image_url}
                alt={name}
              />
            </figure>
            <div className="basis-60 grow">
              <h1 className="text-2xl font-semibold">
                <span>{card?.name}</span>{" "}
                {archetype && (
                  <sup className="text-sm font-normal">({card?.archetype})</sup>
                )}
              </h1>
              {card?.type && (
                <span
                  className={`${getBadgeColor(
                    card.type
                  )} text-sm font-semibold px-2 py-1 rounded-sm text-white shadow-sm inline-block my-2 hover:shadow-md`}
                >
                  {card.type}
                </span>
              )}
              <p>{card?.desc}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SingleCard;
