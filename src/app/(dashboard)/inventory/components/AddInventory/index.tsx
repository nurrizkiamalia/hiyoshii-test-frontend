"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus, Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  datetime: z.string().min(1, { message: "Datetime is required" }),
  PIC: z.string().min(1, { message: "PIC selection is required" }),
  beratKotor: z
    .number()
    .min(1, { message: "Berat Kotor (kg) must be at least 1" }),
  qtyPackA: z.number().min(0, { message: "Qty Pack A cannot be negative" }),
  qtyPackB: z.number().min(0, { message: "Qty Pack B cannot be negative" }),
  qtyPackC: z.number().min(0, { message: "Qty Pack C cannot be negative" }),
  rejectKg: z.number().min(0, { message: "Reject (kg) cannot be negative" }),
});

const picNames = [
  { value: "andri", label: "Andri" },
  { value: "indra", label: "Indra" },
  { value: "indri", label: "Indri" },
];

const AddInventory: React.FC = () => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      datetime: "",
      PIC: "",
      beratKotor: 0,
      qtyPackA: 0,
      qtyPackB: 0,
      qtyPackC: 0,
      rejectKg: 0,
    },
  });

  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex items-center gap-1 py-2 px-3 bg-dspPrimary text-white hover:bg-dspSecondary hover:text-dspPrimary transition-all duration-300 rounded-lg">
        <Plus className="h-5 w-5" /> Tambah Data
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] w-full flex flex-col gap-5 items-center">
        <DrawerHeader className="flex flex-col items-center">
          <DrawerTitle>Tambah Data Packing</DrawerTitle>
          <DrawerDescription>
            Isi form dan submit untuk menambahkan data packing
          </DrawerDescription>
        </DrawerHeader>

        <div className="w-full overflow-y-auto form-scroll flex justify-center mb-5">
          <div className="w-full h-full max-w-xl px-5">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* DateTime Field */}
                <FormField
                  control={form.control}
                  name="datetime"
                  render={({ field }) => (
                    <FormItem className="gap-0 ">
                      <FormLabel className="font-semibold text-base">
                        Datetime
                      </FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* PIC Field */}
                <FormField
                  control={form.control}
                  name="PIC"
                  render={({ field }) => (
                    <FormItem className="gap-0 ">
                      <FormLabel className="font-semibold text-base">
                        PIC
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            {field.value
                              ? picNames.find(
                                  (pic) => pic.value === field.value
                                )?.label
                              : "Pilih PIC..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Cari PIC..." />
                            <CommandList>
                              <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {picNames.map((pic) => (
                                  <CommandItem
                                    key={pic.value}
                                    value={pic.value}
                                    onSelect={() => {
                                      form.setValue("PIC", pic.value);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === pic.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {pic.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Berat Kotor Field */}
                <FormField
                  control={form.control}
                  name="beratKotor"
                  render={({ field }) => (
                    <FormItem className="gap-0 ">
                      <FormLabel className="font-semibold text-base">
                        Berat Kotor (kg)
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} className="placeholder:text-gray-500" placeholder="0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Row for Qty Pack A, B, C */}
                <div className="flex gap-2">
                  {/* Qty Pack A */}
                  <FormField
                    control={form.control}
                    name="qtyPackA"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="font-semibold text-base">
                          Qty Pack A
                        </FormLabel>
                        <FormControl>
                           
                          <Input type="text" {...field} className="placeholder:text-gray-500" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Qty Pack B */}
                  <FormField
                    control={form.control}
                    name="qtyPackB"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="font-semibold text-base">
                          Qty Pack B
                        </FormLabel>
                        <FormControl>
                          <Input type="text" {...field} className="placeholder:text-gray-500" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Qty Pack C */}
                  <FormField
                    control={form.control}
                    name="qtyPackC"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="font-semibold text-base">
                          Qty Pack C
                        </FormLabel>
                        <FormControl>
                          <Input type="text" {...field} className="placeholder:text-gray-500" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Reject (kg) */}
                <FormField
                  control={form.control}
                  name="rejectKg"
                  render={({ field }) => (
                    <FormItem className="gap-0 ">
                      <FormLabel className="font-semibold text-base">
                        Reject (kg)
                      </FormLabel>
                      <FormControl>
                        <Input type="text" {...field} className="placeholder:text-gray-500" placeholder="0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="py-3 px-6 w-full bg-dspPrimary text-white hover:bg-dspSecondary hover:text-dspPrimary transition-all duration-300 rounded-lg"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddInventory;
