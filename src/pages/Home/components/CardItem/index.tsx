import { memo } from "react";
import { Link } from "react-router-dom";
import { Card } from "api/resources";
import { getBadgeColor } from "utils";

interface Props {
  archetype: Card["archetype"];
  attack?: Card["atk"];
  attribute?: Card["attribute"];
  defense?: Card["def"];
  description: Card["desc"];
  id: Card["id"];
  images: Card["card_images"];
  name: Card["name"];
  type: Card["type"];
}

const CardItem = memo(
  ({
    archetype,
    attack,
    defense,
    description,
    id,
    images,
    name,
    type,
  }: Props) => {
    const card = { name, description, images, id, type, archetype };

    return (
      <li className="border rounded-md shadow-md hover:shadow-lg">
        <Link
          className="p-4 w-full flex gap-4"
          state={{ card }}
          to={`/cards/${id}`}
        >
          <figure className="basis-36">
            <img loading="lazy" src={images[0].image_url_small} alt={name} />
          </figure>

          <div className="grow basis-80">
            <h3 className="text-xl font-bold line-clamp-1">{name}</h3>
            <span
              className={`${getBadgeColor(
                type
              )} text-xs font-semibold px-2 py-1 rounded-sm text-white shadow-sm inline-block my-2 hover:shadow-md`}
            >
              {type}
            </span>
            <p className="line-clamp-3">{description}</p>

            {typeof attack !== "undefined" && typeof defense !== "undefined" && (
              <div className="flex gap-2 border-t py-1 mt-2">
                <p className="text-red-900">
                  <span>ATK:</span>{" "}
                  <span className="font-semibold">{attack / 1000}K</span>
                </p>

                <p className="text-cyan-900">
                  <span>DEF:</span>{" "}
                  <span className="font-semibold">{defense / 1000}K</span>
                </p>
              </div>
            )}
          </div>
        </Link>
      </li>
    );
  }
);

CardItem.displayName = "CardItem";
export default CardItem;
