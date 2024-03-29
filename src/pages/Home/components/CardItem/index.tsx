import { memo } from "react";
import { Link } from "react-router-dom";

// utils
import { getBadgeColor } from "utils";
import { useDeckContext } from "contexts/deck";

// components
import { Spin } from "components/icons";

// types
import type { Card } from "services/resources";
import type { FunctionComponent } from "react";
interface Props {
  archetype: Card["archetype"];
  attack?: Card["atk"];
  attribute?: Card["attribute"];
  defense?: Card["def"];
  description: Card["desc"];
  disabled?: boolean;
  icon?: FunctionComponent;
  id: Card["id"];
  images: Card["card_images"];
  isLoading?: boolean;
  level?: Card["level"];
  name: Card["name"];
  onClickIcon?: (card: Partial<Card>) => void;
  type: Card["type"];
}

const CardItem = memo((props: Props) => {
  const {
    archetype,
    attack,
    attribute,
    defense,
    description,
    disabled = false,
    icon: Icon,
    id,
    images,
    isLoading = false,
    level,
    name,
    onClickIcon,
    type,
  } = props;
  const { deckId } = useDeckContext();
  const card = {
    name,
    description,
    images,
    id,
    type,
    archetype,
    level,
  };

  return (
    <li className="border rounded-md shadow-md hover:shadow-lg relative overflow-hidden transition-shadow">
      <div className="w-full flex">
        <Link state={{ card }} to={`/cards/${id}`}>
          <figure className="shrink-0 basis-36 my-auto">
            <img
              alt={name}
              className="aspect-[28/41]"
              height={246}
              loading="lazy"
              src={images[0].image_url_small}
              title={name}
              width={168}
            />
          </figure>
        </Link>

        <div className="grow basis-32 p-4">
          <div className="flex justify-between items-center gap-1">
            <h3 title={name} className="text-lg font-bold line-clamp-1">
              <span>{name}</span>
            </h3>

            {Icon && deckId && (
              <button
                className="disabled:opacity-50"
                disabled={isLoading || disabled}
                onClick={() =>
                  onClickIcon?.({
                    archetype,
                    atk: attack,
                    attribute,
                    card_images: images,
                    def: defense,
                    desc: description,
                    id,
                    level,
                    name,
                    type,
                  })
                }
              >
                {isLoading ? (
                  <Spin className="w-4 h-4 animate-spin" />
                ) : (
                  <Icon />
                )}
              </button>
            )}
          </div>
          <span
            className={`${getBadgeColor(
              type
            )} text-xs font-semibold px-2 py-1 rounded-sm text-white shadow-sm inline-block my-2 hover:shadow-md`}
          >
            {type}
          </span>
          <p title={description} className="line-clamp-3 text-sm">
            {description}
          </p>

          {typeof attack !== "undefined" && typeof defense !== "undefined" && (
            <div className="flex gap-2 border-t py-1 mt-2">
              <p className="text-red-700">
                <span>ATK:</span>{" "}
                <span className="font-semibold">{attack / 1000}K</span>
              </p>

              <p className="text-teal-700">
                <span>DEF:</span>{" "}
                <span className="font-semibold">{defense / 1000}K</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </li>
  );
});

CardItem.displayName = "CardItem";
export default CardItem;
