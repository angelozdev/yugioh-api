import { InfiniteData } from "react-query";

// components
import { Check, Heart } from "components/icons";
import { CardItem, CardList, CardPlaceholder } from "../";

// utils
import { useDeckContext } from "contexts/deck";
import { CARDS_PER_PAGE } from "hooks/useCardList";
import { useAddCardMutation } from "pages/Home/hooks";

// types
import type { Card, Response } from "services/resources";

function Content({
  data,
  isLoading,
  isSuccess,
}: {
  data: InfiniteData<Response<Card[]>> | undefined;
  isLoading: boolean;
  isSuccess: boolean;
}) {
  const { ids } = useDeckContext();
  const addCardMutation = useAddCardMutation();

  return (
    <CardList
      loading={() =>
        Array(CARDS_PER_PAGE)
          .fill(null)
          .map((_, index) => <CardPlaceholder key={index} />)
      }
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      {data?.pages?.map((page) =>
        page.data?.map((card) => {
          const {
            archetype,
            atk,
            attribute,
            card_images,
            def,
            desc,
            name,
            type,
            level,
          } = card;
          return card_images.map(({ id }, index) => {
            const wasAdded =
              addCardMutation.isSuccess &&
              addCardMutation.variables?.card.id === id;

            const isLoading =
              addCardMutation.isLoading &&
              addCardMutation.variables?.card.id === id;

            return (
              <CardItem
                archetype={archetype}
                attack={atk}
                attribute={attribute}
                defense={def}
                description={desc}
                disabled={wasAdded || ids.has(id)}
                icon={wasAdded || ids.has(id) ? Check : Heart}
                id={id}
                imageIndex={index}
                images={card_images}
                isLoading={isLoading}
                key={id}
                level={level}
                name={name}
                onClickIcon={addCardMutation.onAddCard}
                type={type}
              />
            );
          });
        })
      )}
    </CardList>
  );
}

export default Content;
