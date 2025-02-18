"use client";

import React, { useEffect, useState } from "react";
import { usePackingData, deletePacking } from "@/hooks/usePacking";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Trash, SortAsc, SortDesc, PencilIcon } from "lucide-react";
import EditInventory from "../EditInventory";
import InventoryDrawer from "../InventoryDrawer";

const ITEMS_PER_PAGE = 10;

const InventoryTable: React.FC<{ refreshTrigger: number, refreshData: () => void }> = ({ refreshTrigger, refreshData }) => {
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [selectedPackingId, setSelectedPackingId] = useState<number | null>(null);

  const { data: packingData, loading, error } = usePackingData(sortBy, sortDirection, refreshTrigger);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (selectedPackingId !== null) {
      setTimeout(() => setSelectedPackingId(null), 0);
    }
  }, [refreshTrigger]); 
  

  const openDrawer = (row: any) => {
    setSelectedRow(row);
    setIsDrawerOpen(true);
  };

  const confirmDelete = (id: number) => {
    setIsConfirmingDelete(id); 
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(null); 
  }

  const handleDelete = async () => {
    if (isConfirmingDelete === null) return;

    setDeletingId(isConfirmingDelete);
    try {
      await deletePacking(isConfirmingDelete);
      window.location.reload();
    } catch (error) {
      console.error("Delete Error:", error);
    } finally {
      setDeletingId(null);
      setIsConfirmingDelete(null);
    }
  };

  const formatTimestamp = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    
    return `${formattedDate} ${formattedTime}`;
  };  

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
  };

  const totalPages = Math.ceil(packingData.length / ITEMS_PER_PAGE);
  const paginatedData = packingData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Sorting Controls - Visible on All Screens */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <label className="font-bold">Sort By:</label>
          <select value={sortBy} onChange={handleSortChange} className="border px-2 py-1 rounded">
            <option value="id">ID</option>
            <option value="timestamp">Datetime</option>
            <option value="pic">PIC</option>
            <option value="beratKotor">Berat Kotor</option>
            <option value="qtyPackA">Qty Pack A</option>
            <option value="qtyPackB">Qty Pack B</option>
            <option value="qtyPackC">Qty Pack C</option>
            <option value="rejectKg">Reject (kg)</option>
          </select>
        </div>
        <button 
          className="py-1 px-4 bg-dspPrimary font-semibold text-white rounded hover:bg-dspSecondary hover:text-dspPrimary transition flex items-center gap-1"
          onClick={toggleSortDirection}
        >
          Sort: {sortDirection.toUpperCase()} {sortDirection === "asc" ? <SortAsc className="w-5 h-5"/> : <SortDesc className="w-5 h-5"/>}
        </button>
      </div>

      {/* Large Screen Table */}
      <div className="hidden lg:block">
        <Table className="p-5">
          <TableCaption>A list of recent packing data.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
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
            {paginatedData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                <TableCell className="font-medium">{formatTimestamp(data.timestamp)}</TableCell>
                <TableCell>{data.pic}</TableCell>
                <TableCell>{data.beratKotor}</TableCell>
                <TableCell>{data.qtyPackA}</TableCell>
                <TableCell>{data.qtyPackB}</TableCell>
                <TableCell>{data.qtyPackC}</TableCell>
                <TableCell>{data.rejectKg}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => setSelectedPackingId(data.id)}
                      className="flex items-center gap-1 py-2 px-3 bg-dspPrimary text-white hover:bg-dspSecondary hover:text-dspPrimary transition-all duration-300 rounded-lg"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="py-2 px-3 bg-red-500 text-white rounded-xl hover:bg-red-700 transition-all duration-300"
                      onClick={() => confirmDelete(data.id)}
                      disabled={deletingId === data.id}
                    >
                      {deletingId === data.id ? "Deleting..." : <Trash className="w-5 h-5" />}
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Table */}
      <div className="lg:hidden">
        <Table>
          <TableCaption>Tap a row to see more details.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Datetime</TableHead>
              <TableHead>PIC</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((data, index) => (
              <TableRow key={index} onClick={() => openDrawer(data)} className="cursor-pointer hover:bg-gray-100">
                <TableCell>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                <TableCell className="font-medium">{formatTimestamp(data.timestamp)}</TableCell>
                <TableCell>{data.pic}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPackingId(data.id);}}
                    className="flex items-center gap-1 py-2 px-3 bg-dspPrimary text-white hover:bg-dspSecondary hover:text-dspPrimary transition-all duration-300 rounded-lg"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                    <button
                      className="py-2 px-3 bg-red-500 text-white rounded-xl hover:bg-red-700 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(data.id);
                      }}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Drawer Component */}
      <InventoryDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} rowData={selectedRow} />

      {/* Delete Confirmation Modal */}
      {isConfirmingDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this entry?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button 
                onClick={cancelDelete} 
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {deletingId === isConfirmingDelete ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedPackingId !== null && (
        <EditInventory packingId={selectedPackingId} refreshData={refreshData} />
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink href="#" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext href="#" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default InventoryTable;
