import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";

// utils
import { getBadgeColor } from "utils";
import cardsServices from "services/cards";

//components
import { ArrowLeft } from "components/icons/";

// types
import type { Card } from "services/resources";

interface CardFromState {
  name: Card["name"];
  description: Card["desc"];
  images: Card["card_images"];
  id: Card["id"];
  type: Card["type"];
  archetype: Card["archetype"];
  imageIndex: number;
}

function SingleCard() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) throw new Error("No card id");

  const {
    name,
    description,
    images,
    type,
    archetype,
    imageIndex,
  }: CardFromState = state?.card || {};

  const {
    data: card,
    isLoading,
    isSuccess,
  } = useQuery<Card>(["card", { id }], () => cardsServices.getById(id), {
    initialData: state?.card
      ? {
          archetype,
          card_images: images,
          card_prices: [],
          card_sets: [],
          desc: description,
          id: +id,
          name,
          race: "",
          type,
        }
      : undefined,
    staleTime: Infinity,
  });

  return (
    <section className="container">
      <div className="my-4">
        <button
          className="inline-flex mb-4 px-3 py-1 border rounded-sm hover:shadow"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </button>

        {isLoading && <div>Loading...</div>}

        {isSuccess && (
          <div className="flex flex-col sm:flex-row gap-4">
            <figure className="basis-60">
              <img
                className="object-cover mx-auto"
                width={240}
                src={card?.card_images[imageIndex || 0].image_url}
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
