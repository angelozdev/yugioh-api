import { memo } from "react";
import { Link } from "react-router-dom";
import { Card } from "api/resources";
import { getBadgeColor } from "utils";

interface Props {
  description: Card["desc"];
  id: Card["id"];
  images: Card["card_images"];
  name: Card["name"];
  type: Card["type"];
  archetype: Card["archetype"];
}

const CardItem = memo(
  ({ name, description, images, id, type, archetype }: Props) => {
    const card = { name, description, images, id, type, archetype };

    return (
      <li className="border rounded-md shadow-md hover:shadow-lg">
        <Link
          className="p-4 w-full flex gap-4"
          state={{ card }}
          to={`/cards/${id}`}
        >
          <figure className="basis-32">
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
          </div>
        </Link>
      </li>
    );
  }
);

CardItem.displayName = "CardItem";
export default CardItem;
