function CardPlaceholder() {
  return (
    <li className="border rounded-md shadow-md h-56">
      <div className="p-4 w-full flex gap-4 h-full animate-pulse">
        <span className="basis-36 shrink-0 aspect-[28/41] bg-gray-300 h-full inline-block" />

        <div className="grow basis-80 leading-5">
          <span className="bg-gray-300 inline-block w-full h-6 mb-1" />

          <span className="bg-gray-300 inline-block w-full h-2" />
          <span className="bg-gray-300 inline-block w-full h-2" />
          <span className="bg-gray-300 inline-block w-full h-2" />
        </div>
      </div>
    </li>
  );
}

export default CardPlaceholder;
