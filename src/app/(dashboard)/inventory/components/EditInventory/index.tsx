"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { usePackingById, updatePacking } from "@/hooks/usePacking";
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

const EditInventory: React.FC<{ packingId: number | null; refreshData: () => void }> = ({ packingId, refreshData }) => {
  const [open, setOpen] = useState(false);
  const { data } = usePackingById(packingId);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timestamp: "",
      pic: "",
      beratKotor: 0,
      qtyPackA: 0,
      qtyPackB: 0,
      qtyPackC: 0,
      rejectKg: 0,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        timestamp: data.timestamp.slice(0, 19),
        pic: data.pic,
        beratKotor: data.beratKotor,
        qtyPackA: data.qtyPackA,
        qtyPackB: data.qtyPackB,
        qtyPackC: data.qtyPackC,
        rejectKg: data.rejectKg,
      });
      setOpen(true);
    }
  }, [data, form]);

  const onSubmit = async (formData: any) => {
    if (!packingId) return;
    try {
      await updatePacking(packingId, formData);
      setOpen(false);
      refreshData();
    } catch (error) {
      console.error("Failed to update inventory:", error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="h-[90vh] w-full flex flex-col gap-5 items-center">
        <DrawerHeader className="flex flex-col items-center">
          <DrawerTitle>Edit Data Packing</DrawerTitle>
          <DrawerDescription>
            Isi form dan submit untuk memperbarui data packing
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

                {/* PIC Field */}
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
                  Save Changes
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditInventory;
