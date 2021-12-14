import { memo } from "react";
import { Link } from "react-router-dom";
import { Card } from "api/resources";

interface Props {
  name: Card["name"];
  description: Card["desc"];
  image: Card["card_images"][0]["image_url"];
}

const PokemonItem = memo(({ name, description, image }: Props) => {
  return (
    <li className="border rounded-md shadow-md">
      <Link className="p-4 w-full flex gap-4" to="/">
        <figure className="basis-32">
          <img src={image} alt={name} />
        </figure>

        <div className="grow basis-80">
          <h3 className="text-xl font-bold line-clamp-1">{name}</h3>
          <p className="line-clamp-3">{description}</p>
        </div>
      </Link>
    </li>
  );
});

export default PokemonItem;
