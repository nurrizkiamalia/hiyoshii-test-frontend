import apiClient from "@/lib/apiClient";
import { HourlyAccumulationDTO, Packing, PackingDTO, PackRatioDTO, ProductivityDTO, RejectRatioDTO } from "@/types/datatypes"
import { useCallback, useEffect, useState } from "react";

export const usePackingData = (sortBy: string = "id", sortDirection: string = "asc", refreshTrigger?: number) => {
    const [data, setData] = useState<Packing[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPackingData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiClient.get<Packing[]>(`/packing?sortBy=${sortBy}&sortDirection=${sortDirection}`);
            setData(response.data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [sortBy, sortDirection]);

    useEffect(() => {
        fetchPackingData();
    }, [fetchPackingData, refreshTrigger]);

    return { data, loading, error };
};

export const usePackingReports = () => {
    const [reportData, setReportData] = useState({
        qtyByPIC: [],
        qtyByPackModel: [],
        productivityByPIC: [],
        rejectRatio: [],
        packRatios: []
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const [qtyByPICRes, qtyByPackModelRes, productivityRes, rejectRatioRes, packRatiosRes] = await Promise.all([
                    apiClient.get("/packing/qty-hourly-pic"),
                    apiClient.get("/packing/qty-hourly-pack"),
                    apiClient.get("/packing/productivity"),
                    apiClient.get("/packing/reject-ratio"),
                    apiClient.get("/packing/pack-ratio")
                ]);

                setReportData({
                    qtyByPIC: qtyByPICRes.data,
                    qtyByPackModel: qtyByPackModelRes.data,
                    productivityByPIC: productivityRes.data,
                    rejectRatio: rejectRatioRes.data,
                    packRatios: packRatiosRes.data
                });

            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    return { reportData, loading, error };
};

export const usePackingById = (id: number | null) => {
    const [data, setData] = useState<Packing | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!id) return;

        const fetchPackingById = async () => {
            try{
                const response = await apiClient.get<Packing>(`/packing/${id}`);
                setData(response.data);
            } catch(error: any){
                setError(error.message);
            } finally{
                setLoading(false);
            }
        };

        fetchPackingById();
    }, [id]);

    return {data, loading, error};
};

export const createPacking = async (packingDto: PackingDTO) => {
    try {
        const response = await apiClient.post<Packing>("/packing", packingDto);
        return response.data;
    } catch(error: any){
        throw new Error(error.response?.data?.message || "Failed to create parking data.")
    }
}

export const updatePacking = async (id: number, packingDto: PackingDTO) => {
    try {
        const response = await apiClient.patch<Packing>(`/packing/${id}`, packingDto); 
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to update packing data.");
    }
};

export const deletePacking = async(id: number) => {
    try{
        await apiClient.delete(`/packing/${id}`);
    } catch(error: any){
        throw new Error(error.response?.data?.message || "Failed to delete packing data.")
    }
}