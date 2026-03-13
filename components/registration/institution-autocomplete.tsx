"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

interface InstitutionAutocompleteProps {
  placeholder: string;
  value: string;
  options: string[];
  onValueChange: (value: string) => void;
  onAddOption: (value: string) => void;
}

function normalizeInstitution(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function getInstitutionScore(option: string, query: string): number {
  const normalizedOption = normalizeInstitution(option);

  if (!query) return 0;
  if (normalizedOption.startsWith(query)) return 0;

  const includesIndex = normalizedOption.indexOf(query);
  if (includesIndex >= 0) return 100 + includesIndex;

  return 1000;
}

const INSTITUTION_PRIORITY: string[] = [
  "National University of Computer and Emerging Sciences (FAST), Karachi",
  "Institute of Business Administration (IBA), Karachi",
  "NED University of Engineering & Technology, Karachi",
  "Habib University, Karachi",
];

const INSTITUTION_PRIORITY_RANK = new Map(
  INSTITUTION_PRIORITY.map((institution, index) => [
    normalizeInstitution(institution),
    index,
  ])
);

function getPriorityRank(option: string): number {
  return INSTITUTION_PRIORITY_RANK.get(normalizeInstitution(option)) ?? Number.MAX_SAFE_INTEGER;
}

export default function InstitutionAutocomplete({
  placeholder,
  value,
  options,
  onValueChange,
  onAddOption,
}: InstitutionAutocompleteProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const normalizedValue = normalizeInstitution(value);

  const filteredOptions = useMemo(() => {
    const relevantOptions = options.filter((option) => {
      if (!normalizedValue) return true;
      return normalizeInstitution(option).includes(normalizedValue);
    });

    return relevantOptions
      .sort((left, right) => {
        const leftScore = getInstitutionScore(left, normalizedValue);
        const rightScore = getInstitutionScore(right, normalizedValue);

        if (leftScore !== rightScore) {
          return leftScore - rightScore;
        }

        const leftPriority = getPriorityRank(left);
        const rightPriority = getPriorityRank(right);

        if (leftPriority !== rightPriority) {
          return leftPriority - rightPriority;
        }

        return left.localeCompare(right);
      });
  }, [options, normalizedValue]);

  const hasExactMatch = options.some(
    (option) => normalizeInstitution(option) === normalizedValue
  );

  const showAddButton = normalizedValue.length > 0 && !hasExactMatch;

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const showDropdown =
    isOpen && (filteredOptions.length > 0 || showAddButton || normalizedValue.length > 0);

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsOpen(true)}
        onValueChange={(nextValue) => {
          onValueChange(nextValue);
          setIsOpen(true);
        }}
        classNames={{
          input: "bg-dark-red text-white placeholder:text-gray-600",
          inputWrapper: "bg-dark-red border-2 border-gray-800 hover:border-gray-700 h-[56px]",
        }}
        radius="none"
      />

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 border border-gray-800 bg-[#131315] shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          {filteredOptions.length > 0 && (
            <div className="max-h-56 overflow-y-auto">
              {filteredOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="w-full border-b border-gray-900 px-4 py-3 text-left text-sm text-gray-200 transition-colors hover:bg-white/20 hover:text-white focus:bg-white/20 focus:text-white"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onValueChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {showAddButton && (
            <div className="border-t border-gray-800 p-3">
              <Button
                type="button"
                radius="none"
                className="h-10 w-full bg-red-primary text-white font-mono text-xs uppercase hover:bg-red-700"
                onPress={() => {
                  const nextValue = value.trim();
                  if (!nextValue) return;
                  onAddOption(nextValue);
                  onValueChange(nextValue);
                  setIsOpen(false);
                }}
              >
                Add "{value.trim()}"
              </Button>
            </div>
          )}

          {filteredOptions.length === 0 && !showAddButton && normalizedValue.length > 0 && (
            <div className="px-4 py-3 text-xs text-gray-500 font-mono uppercase">
              No matching institutions
            </div>
          )}
        </div>
      )}
    </div>
  );
}