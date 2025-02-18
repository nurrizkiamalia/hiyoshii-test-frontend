"use client";

import { useState } from "react";
import InventoryTable from "./components/InventoryTable";
import AddInventory from "./components/AddInventory";

const Inventory: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0); 

  const refreshData = () => setRefreshTrigger(prev => prev + 1);

  return (
    <div className="flex flex-col gap-3">
        <div className="p-3 flex items-center justify-between gap-5">
            <div className="mt-2">
                <h2 className="font-semibold text-2xl text-dspPrimary">Table Inventory</h2>
                <p className="text-gray-500">Tambah informasi inventori di sini, pilih PIC dan input data produk.</p>
            </div>
            <AddInventory refreshData={refreshData} /> 
        </div>
        <hr />
        <div className="p-3">
            <InventoryTable refreshTrigger={refreshTrigger} refreshData={refreshData} />
        </div>
    </div>
  );
};

export default Inventory;
