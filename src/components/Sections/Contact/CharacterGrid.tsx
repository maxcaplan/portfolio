import CharacterRow from "./CharacterRow";

export default function CharacterGrid() {
  return (
    <div className="w-full h-full grid grid-rows-6 grid-flow-row gap-y-4">
      <CharacterRow />
      <CharacterRow />
      <CharacterRow />
      <CharacterRow />
      <CharacterRow />
      <CharacterRow />
    </div>
  );
}
