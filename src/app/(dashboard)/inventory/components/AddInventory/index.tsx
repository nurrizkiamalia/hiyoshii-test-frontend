"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import { createPacking } from "@/hooks/usePacking";
import PICSelector from "../PICSelector";

const formSchema = z.object({
  timestamp: z.string().min(1, { message: "Datetime is required" }),
  pic: z.string().min(1, { message: "PIC selection is required" }),
  beratKotor: z.preprocess((val) => parseFloat(val as string), z.number().min(0.01, { message: "Berat Kotor must be at least 0.01" })),
  qtyPackA: z.preprocess((val) => parseFloat(val as string), z.number().min(0, { message: "Qty Pack A cannot be negative" })),
  qtyPackB: z.preprocess((val) => parseFloat(val as string), z.number().min(0, { message: "Qty Pack B cannot be negative" })),
  qtyPackC: z.preprocess((val) => parseFloat(val as string), z.number().min(0, { message: "Qty Pack C cannot be negative" })),
  rejectKg: z.preprocess((val) => parseFloat(val as string), z.number().min(0, { message: "Reject (kg) cannot be negative" })),
});

const AddInventory: React.FC <{ refreshData: () => void }> = ({ refreshData }) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timestamp: new Date().toISOString().slice(0, 16),
      pic: "",
      beratKotor: 0,
      qtyPackA: 0,
      qtyPackB: 0,
      qtyPackC: 0,
      rejectKg: 0,
    },
  });

  const formatDateForBackend = (datetime: string) => {
    return datetime.replace(" ", "T");
  };

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        timestamp: formatDateForBackend(data.timestamp), 
        beratKotor: parseFloat(data.beratKotor),
        qtyPackA: parseFloat(data.qtyPackA),
        qtyPackB: parseFloat(data.qtyPackB),
        qtyPackC: parseFloat(data.qtyPackC),
        rejectKg: parseFloat(data.rejectKg),
      };

      await createPacking(formattedData);
      setOpen(false);
      refreshData();
    } catch (error) {
      console.error("Failed to add inventory:", error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="flex items-center gap-1 py-2 px-3 bg-dspPrimary text-white hover:bg-dspSecondary hover:text-dspPrimary transition-all duration-300 rounded-lg">
        <Plus className="h-5 w-5" /> <span className="max-md:hidden text-sm lg:text-base">Tambah Data</span>
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
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* DateTime Field */}
                <div>
                  <label className="font-semibold text-base">Datetime</label>
                  <Input type="datetime-local" step="1" {...form.register("timestamp")} />
                </div>

                {/* PIC Field (Separated Component) */}
                <PICSelector onChange={(value) => form.setValue("pic", value, { shouldValidate: true })} />

                {/* Berat Kotor Field */}
                <div>
                  <label className="font-semibold text-base">Berat Kotor (kg)</label>
                  <Input type="number" step="0.01" {...form.register("beratKotor")} placeholder="0.00" />
                </div>

                {/* Row for Qty Pack A, B, C */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="font-semibold text-base">Qty Pack A</label>
                    <Input type="number" step="0.01" {...form.register("qtyPackA")} placeholder="0.00" />
                  </div>
                  <div className="flex-1">
                    <label className="font-semibold text-base">Qty Pack B</label>
                    <Input type="number" step="0.01" {...form.register("qtyPackB")} placeholder="0.00" />
                  </div>
                  <div className="flex-1">
                    <label className="font-semibold text-base">Qty Pack C</label>
                    <Input type="number" step="0.01" {...form.register("qtyPackC")} placeholder="0.00" />
                  </div>
                </div>

                {/* Reject (kg) */}
                <div>
                  <label className="font-semibold text-base">Reject (kg)</label>
                  <Input type="number" step="0.01" {...form.register("rejectKg")} placeholder="0.00" />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-dspPrimary text-white hover:bg-dspSecondary hover:text-dspPrimary transition-all duration-300 rounded-lg">
                  Submit
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddInventory;
