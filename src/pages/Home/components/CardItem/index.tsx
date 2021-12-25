import { memo } from "react";
import { Link } from "react-router-dom";

// utils
import { getBadgeColor } from "utils";

// types
import type { Card } from "services/resources";
interface Props {
  archetype: Card["archetype"];
  attack?: Card["atk"];
  attribute?: Card["attribute"];
  defense?: Card["def"];
  description: Card["desc"];
  id: Card["id"];
  imageIndex: number;
  images: Card["card_images"];
  isLoading?: boolean;
  name: Card["name"];
  onAddCard?: (card: Partial<Card>) => Promise<void>;
  onDeleteCard?: (cardId: string) => Promise<void>;
  showSuccessIcon?: boolean;
  type: Card["type"];
}

const CardItem = memo(
  ({
    archetype,
    attack,
    attribute,
    defense,
    description,
    id,
    imageIndex,
    images,
    isLoading = false,
    name,
    onAddCard,
    onDeleteCard,
    showSuccessIcon = false,
    type,
  }: Props) => {
    const card = { name, description, images, id, type, archetype, imageIndex };

    return (
      <li className="border rounded-md shadow-md hover:shadow-lg relative overflow-hidden">
        <div className="bg-white rounded-full hover:shadow-md shadow-sm absolute top-3 right-2 p-1 leading-none hover:text-red-600 transition-colors">
          <button
            className="disabled:opacity-50"
            disabled={showSuccessIcon || isLoading}
            onClick={() => {
              onAddCard?.({
                archetype,
                atk: attack,
                attribute,
                card_images: images,
                def: defense,
                desc: description,
                id,
                name,
                type,
              });

              onDeleteCard?.(String(id));
            }}
          >
            {showSuccessIcon ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : onAddCard ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            ) : (
              onDeleteCard && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )
            )}
          </button>
        </div>
        <Link className="w-full flex" state={{ card }} to={`/cards/${id}`}>
          <figure className="shrink-0 basis-36 my-auto">
            <img
              alt={name}
              className="aspect-[28/41]"
              loading="lazy"
              src={images[imageIndex].image_url_small}
              title={String(id)}
            />
          </figure>

          <div className="grow basis-32 p-4">
            <h3 title={name} className="text-lg font-bold line-clamp-1 mr-5">
              {imageIndex > 0 && (
                <span className="text-sm">({imageIndex + 1})</span>
              )}{" "}
              <span>{name}</span>
            </h3>
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
