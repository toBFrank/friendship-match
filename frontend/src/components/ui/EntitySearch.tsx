// ── Entity Search ─────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import SuggestForm from "./SuggestForm";

export interface SearchItem {
  id: number;
  primary: string; // bold label
  secondary?: string; // dimmer secondary text
}

interface EntitySearchProps {
  items: SearchItem[];
  selectedIds: number[];
  placeholder: string;
  suggestType: string;
  suggestPlaceholder: string;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  onSuggest: (value: string) => void;
  single?: boolean; // if true, only one selection allowed
}

export default function EntitySearch({
  items,
  selectedIds,
  placeholder,
  suggestType,
  suggestPlaceholder,
  onAdd,
  onRemove,
  onSuggest,
  single = false,
}: EntitySearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedItems = items.filter((i) => selectedIds.includes(i.id));

  const suggestions =
    query.trim().length === 0
      ? []
      : items
          .filter((i) => {
            if (selectedIds.includes(i.id)) return false;
            const q = query.toLowerCase();
            return (
              i.primary.toLowerCase().includes(q) ||
              i.secondary?.toLowerCase().includes(q)
            );
          })
          .slice(0, 8);

  const noMatch = open && query.trim().length > 0 && suggestions.length === 0;

  function handleSelect(item: SearchItem) {
    onAdd(item.id);
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }

  function handleSuggest(value: string) {
    onSuggest(value);
    setSubmitted(value);
    setSuggesting(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const canAdd = !single || selectedIds.length === 0;

  return (
    <div>
      {/* Search input — hidden once selection made in single mode */}
      {canAdd && (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => query.trim().length > 0 && setOpen(true)}
            placeholder={placeholder}
            className="w-full border border-black px-3 py-2 text-sm focus-visible:outline-black focus-visible:outline-0"
          />

          {open && suggestions.length > 0 && (
            <ul
              ref={listRef}
              className="absolute left-0 right-0 top-full border border-t border-black bg-white z-50 no-scrollbar"
            >
              {suggestions.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-black hover:text-white cursor-pointer"
                  >
                    <span className="font-medium">{item.primary}</span>
                    {item.secondary && (
                      <span className="ml-2">— {item.secondary}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {noMatch && (
            <div className="absolute left-0 right-0 top-full border border-t-0 border-black bg-white z-50 px-3 py-2 text-sm">
              No matching {suggestType}s found.
            </div>
          )}
        </div>
      )}

      {/* Selected items */}
      {selectedItems.length > 0 && (
        <ul className="flex flex-col mt-3">
          {selectedItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between px-3 py-2 text-sm border border-black"
            >
              <span>
                <span className="font-medium">{item.primary}</span>
                {item.secondary && (
                  <span className="ml-2">— {item.secondary}</span>
                )}
              </span>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.primary}`}
                className="ml-4 hover:font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {!single && (
        <p aria-live="polite" className="mt-2 text-sm">
          {selectedIds.length} selected
        </p>
      )}

      {/* Suggest */}
      {!suggesting && !submitted && (
        <button
          type="button"
          onClick={() => setSuggesting(true)}
          className="mt-3 text-sm underline hover:font-medium"
        >
          Can't find your {suggestType}? Suggest it.
        </button>
      )}
      {suggesting && (
        <SuggestForm
          type={suggestType}
          placeholder={suggestPlaceholder}
          onSubmit={handleSuggest}
          onCancel={() => setSuggesting(false)}
        />
      )}
      {submitted && (
        <p className="mt-3 text-sm">
          Thanks! "{submitted}" has been submitted for review.
        </p>
      )}
    </div>
  );
}
