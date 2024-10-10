import {memo, useEffect, useState} from "react";

type SearchFormProps = {
  term: string;
  onSubmit: (value: string) => void;
}

export const SearchForm = memo(({term, onSubmit}: SearchFormProps) => {
  const [tempSearch, setTempSearch] = useState<string>("");

  useEffect(() => {
    setTempSearch(term);
  }, [term]);

  return (
    <div className="searchForm">
      <input
        type="text"
        placeholder="Search"
        value={tempSearch}
        onChange={(e) => setTempSearch(e.currentTarget.value)}
      />
      <button onClick={() => onSubmit(tempSearch)}>Find</button>
    </div>
  )
});
