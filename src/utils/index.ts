import { Card, CardTypes } from "services/resources";

export const getBadgeColor = (type: Card["type"]) => {
  const colors: Record<CardTypes, string> = {
    "Spell Card": "bg-indigo-700",
    "Normal Monster": "bg-blue-500",
    "Effect Monster": "bg-cyan-500",
    "Flip Effect Monster": "bg-orange-500",
    "Trap Card": "bg-red-800",
    "Fusion Monster": "bg-purple-500",
    "Union Effect Monster": "bg-amber-500",
    "Pendulum Effect Monster": "bg-lime-500",
    "Link Monster": "bg-green-900",
    "Synchro Tuner Monster": "bg-gray-700",
  };

  return colors[type] || "bg-gray-500";
};
