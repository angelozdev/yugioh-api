import { Card } from "api/resources";
import { useLocation } from "react-router-dom";
import { getBadgeColor } from "utils";

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
  const hasCard = !!state?.card;
  const { name, description, images, id, type, archetype }: CardFromState =
    state?.card || {};
  return (
    <section className="container">
      <div className="my-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <figure className="basis-60">
            <img
              className="object-cover mx-auto"
              width={240}
              src={images[0].image_url}
              alt={name}
            />
          </figure>
          <div className="basis-60 grow">
            <h1 className="text-2xl font-semibold">
              <span>{name}</span>{" "}
              {archetype && (
                <sup className="text-sm font-normal">({archetype})</sup>
              )}
            </h1>
            <span
              className={`${getBadgeColor(
                type
              )} text-sm font-semibold px-2 py-1 rounded-sm text-white shadow-sm inline-block my-2 hover:shadow-md`}
            >
              {type}
            </span>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleCard;
