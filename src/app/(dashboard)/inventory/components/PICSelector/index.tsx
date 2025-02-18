"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

const picNames = [
  { value: "Andri", label: "Andri" },
  { value: "Indra", label: "Indra" },
  { value: "Indri", label: "Indri" },
];

interface PICSelectorProps {
  onChange: (value: string) => void;
}

const PICSelector: React.FC<PICSelectorProps> = ({ onChange }) => {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      control={control}
      name="pic"
      render={({ field }) => (
        <div className="gap-0">
          <label className="font-semibold text-base">PIC</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" className="w-full justify-between">
                {field.value ? picNames.find((pic) => pic.value === field.value)?.label : "Pilih PIC..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Cari PIC..." />
                <CommandList>
                  <CommandEmpty>PIC Tidak Ditemukan</CommandEmpty>
                  <CommandGroup>
                    {picNames.map((pic) => (
                      <CommandItem
                        key={pic.value}
                        value={pic.value}
                        onSelect={() => {
                          setValue("pic", pic.value, { shouldValidate: true });
                          onChange(pic.value); // ✅ Pass value to parent component
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", field.value === pic.value ? "opacity-100" : "opacity-0")} />
                        {pic.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  );
};

export default PICSelector;
