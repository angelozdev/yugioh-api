import { useLocation, useParams } from "react-router-dom";
import { getBadgeColor } from "utils";
import { useQuery } from "react-query";
import cardAPI from "api/cards";

// types
import type { Card } from "api/resources";

interface CardFromState {
  name: Card["name"];
  description: Card["desc"];
  images: Card["card_images"];
  id: Card["id"];
  type: Card["type"];
  archetype: Card["archetype"];
}

function SingleCard() {
  const { state } = useLocation();
  const { id } = useParams();
  if (!id) throw new Error("No card id");

  const { name, description, images, type, archetype }: CardFromState =
    state?.card || {};

  const {
    data: card,
    isLoading,
    isSuccess,
  } = useQuery<Card>(["card", { id }], () => cardAPI.getById(id), {
    initialData: state?.card
      ? {
          name,
          desc: description,
          card_images: images,
          id: +id,
          type,
          archetype,
          card_prices: [],
          card_sets: [],
          race: "",
        }
      : undefined,
    staleTime: Infinity,
  });

  return (
    <section className="container">
      <div className="my-4">
        {isLoading && <div>Loading...</div>}

        {isSuccess && (
          <div className="flex flex-col sm:flex-row gap-4">
            <figure className="basis-60">
              <img
                className="object-cover mx-auto"
                width={240}
                src={card?.card_images[0].image_url}
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