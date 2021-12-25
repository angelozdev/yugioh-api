import db from "firebase-client/db";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

// types
import type { Card, Deck } from "services/resources";

export async function getAll(): Promise<Deck[]> {
  const querySnapshot = await getDocs(collection(db, "decks"));
  const decks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Deck[];

  return decks;
}

export async function getById(id: string): Promise<Deck | null> {
  const deckRef = doc(db, "decks", id);
  const cardsRef = collection(deckRef, "cards");
  const deck = await getDoc(deckRef);
  const cardsQuerySnapshot = await getDocs(cardsRef);
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

export async function addCard(deckId: string, card: Partial<Card>) {
  if (!card?.id) throw new Error("Card must have an id");
  const deckRef = doc(
    collection(db, "decks", deckId, "cards"),
    String(card.id)
  );
  await setDoc(deckRef, card);
}

export async function deleteCard(deckId: string, cardId: string) {
  const deckRef = doc(db, "decks", deckId);
  const cardRef = doc(deckRef, "cards", cardId);
  await deleteDoc(cardRef);
}

const decksService = { getAll, getById, addCard, deleteCard };
export default decksService;
