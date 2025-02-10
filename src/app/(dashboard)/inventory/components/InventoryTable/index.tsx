import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

  import { PencilIcon, Trash } from "lucide-react";
import EditInventory from "../EditInventory";
  
  const packingData = [
    {
      datetime: "2024-02-10 08:00",
      PIC: "John Doe",
      beratKotor: 50,
      qtyPackA: 15,
      qtyPackB: 20,
      qtyPackC: 10,
      rejectKg: 5,
    },
    {
      datetime: "2024-02-10 09:00",
      PIC: "John Doe",
      beratKotor: 45,
      qtyPackA: 12,
      qtyPackB: 18,
      qtyPackC: 8,
      rejectKg: 7,
    },
    {
      datetime: "2024-02-10 10:00",
      PIC: "Jane Smith",
      beratKotor: 60,
      qtyPackA: 20,
      qtyPackB: 25,
      qtyPackC: 15,
      rejectKg: 6,
    },
    {
      datetime: "2024-02-10 11:00",
      PIC: "Jane Smith",
      beratKotor: 55,
      qtyPackA: 18,
      qtyPackB: 22,
      qtyPackC: 12,
      rejectKg: 3,
    },
    {
      datetime: "2024-02-10 12:00",
      PIC: "Robert Lee",
      beratKotor: 65,
      qtyPackA: 22,
      qtyPackB: 28,
      qtyPackC: 18,
      rejectKg: 5,
    },
    {
      datetime: "2024-02-10 13:00",
      PIC: "Robert Lee",
      beratKotor: 58,
      qtyPackA: 19,
      qtyPackB: 23,
      qtyPackC: 14,
      rejectKg: 2,
    },
    {
      datetime: "2024-02-10 14:00",
      PIC: "John Doe",
      beratKotor: 52,
      qtyPackA: 17,
      qtyPackB: 21,
      qtyPackC: 11,
      rejectKg: 4,
    },
    {
      datetime: "2024-02-10 15:00",
      PIC: "Jane Smith",
      beratKotor: 63,
      qtyPackA: 21,
      qtyPackB: 26,
      qtyPackC: 16,
      rejectKg: 5,
    },
    {
      datetime: "2024-02-10 16:00",
      PIC: "Robert Lee",
      beratKotor: 59,
      qtyPackA: 20,
      qtyPackB: 24,
      qtyPackC: 13,
      rejectKg: 6,
    },
    {
      datetime: "2024-02-10 17:00",
      PIC: "John Doe",
      beratKotor: 54,
      qtyPackA: 16,
      qtyPackB: 19,
      qtyPackC: 10,
      rejectKg: 3,
    },
  ];
  
  const InventoryTable: React.FC = () => {
    return (
      <Table className="p-5">
        <TableCaption>A list of recent packing data.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Datetime</TableHead>
            <TableHead>PIC</TableHead>
            <TableHead>Berat Kotor (kg)</TableHead>
            <TableHead>Qty Pack A</TableHead>
            <TableHead>Qty Pack B</TableHead>
            <TableHead>Qty Pack C</TableHead>
            <TableHead>Reject (kg)</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packingData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{data.datetime}</TableCell>
              <TableCell>{data.PIC}</TableCell>
              <TableCell>{data.beratKotor}</TableCell>
              <TableCell>{data.qtyPackA}</TableCell>
              <TableCell>{data.qtyPackB}</TableCell>
              <TableCell>{data.qtyPackC}</TableCell>
              <TableCell>{data.rejectKg}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center gap-1 justify-end">
                    <EditInventory />
                    <button className="py-2 px-3 bg-dspSecondary text-dspPrimary hover:bg-dspPrimary hover:text-white transition-all duration-300 rounded-xl"><Trash className="w-5 h-5" /></button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>
              {packingData.reduce((acc, curr) => acc + curr.beratKotor, 0)}
            </TableCell>
            <TableCell>
              {packingData.reduce((acc, curr) => acc + curr.qtyPackA, 0)}
            </TableCell>
            <TableCell>
              {packingData.reduce((acc, curr) => acc + curr.qtyPackB, 0)}
            </TableCell>
            <TableCell>
              {packingData.reduce((acc, curr) => acc + curr.qtyPackC, 0)}
            </TableCell>
            <TableCell>
              {packingData.reduce((acc, curr) => acc + curr.rejectKg, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  };
  
  export default InventoryTable;
  