"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Packing } from "@/types/datatypes";

interface InventoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  rowData: Packing | null;
}

const InventoryDrawer: React.FC<InventoryDrawerProps> = ({ isOpen, onClose, rowData }) => {
  if (!rowData) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Loading Data...</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  }

  const formatTimestamp = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    
    return `${formattedDate} ${formattedTime}`;
  };  

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Inventory Details</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <Table className="border rounded-lg">
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Datetime</TableCell>
                <TableCell>{formatTimestamp(rowData.timestamp)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">PIC</TableCell>
                <TableCell>{rowData.pic}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Berat Kotor</TableCell>
                <TableCell>{rowData.beratKotor} kg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Qty Pack A</TableCell>
                <TableCell>{rowData.qtyPackA}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Qty Pack B</TableCell>
                <TableCell>{rowData.qtyPackB}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Qty Pack C</TableCell>
                <TableCell>{rowData.qtyPackC}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Reject (kg)</TableCell>
                <TableCell>{rowData.rejectKg}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InventoryDrawer;
