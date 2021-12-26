import db from "firebase-client/db";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

// types
import type { Card, Deck } from "services/resources";

const decksRef = collection(db, "decks");

export async function getAll(): Promise<Deck[]> {
  const querySnapshot = await getDocs(decksRef);
  const decks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Deck[];

  return decks;
}

export async function getById(id: string): Promise<Deck | null> {
  const deckRef = doc(db, "decks", id);
  const deck = await getDoc(deckRef);
  const cardsRef = collection(deckRef, "cards");
  const q = query(cardsRef, orderBy("atk", "desc"), orderBy("def", "desc"));
  const cardsQuerySnapshot = await getDocs(q);

  const cards = cardsQuerySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Card[];

  if (!deck.exists()) return null;
  return {
    id: deck.id,
    ...deck.data(),
    cards,
  } as Deck;
}

export async function addCard(deckId: string, card: Card) {
  if (!card?.id) throw new Error("Card must have an id");
  const deckRef = doc(
    collection(db, "decks", deckId, "cards"),
    String(card.id)
  );
  await setDoc(deckRef, card);

  return card;
}

export async function deleteCard(deckId: string, cardId: string) {
  const deckRef = doc(db, "decks", deckId);
  const cardRef = doc(deckRef, "cards", cardId);
  const card = await getDoc(cardRef);
  await deleteDoc(cardRef);

  return {
    id: card.id,
    ...card.data(),
  } as Card;
}

const decksService = { getAll, getById, addCard, deleteCard };
export default decksService;
