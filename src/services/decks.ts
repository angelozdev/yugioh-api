import db from "libs/firebase/db";
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
import { sleepWithError } from "utils/sleep";

const decksRef = collection(db, "decks");

async function getMany(): Promise<Deck[]> {
  const querySnapshot = await getDocs(decksRef);
  const decks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Deck[];

  return decks;
}

async function getById(id: string): Promise<Deck | null> {
  const deckRef = doc(db, "decks", id);
  const deck = await getDoc(deckRef);
  const cardsRef = collection(deckRef, "cards");
  const q = query(cardsRef, orderBy("name", "asc"));
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

async function addById(deckId: string, card: Card) {
  // await sleepWithError(1000, "Error adding card. Please try again.");

  if (!card?.id) throw new Error("Card must have an id");
  const deckRef = doc(
    collection(db, "decks", deckId, "cards"),
    String(card.id)
  );
  await setDoc(deckRef, card);

  return card;
}

async function deleteById(deckId: string, cardId: string) {
  // await sleepWithError(1000, "Error deleting card. Please try again.");

  const deckRef = doc(db, "decks", deckId);
  const cardRef = doc(deckRef, "cards", cardId);
  const card = await getDoc(cardRef);
  await deleteDoc(cardRef);

  return {
    id: card.id,
    ...card.data(),
  } as Card;
}

const decksService = { getMany, getById, addById, deleteById };

export default decksService;
