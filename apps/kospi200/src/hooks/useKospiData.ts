import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Stock {
  code: string;
  name: string;
  toBuy: string[];
  today: number;
  last: number;
  changePercent: number;
  absChangePercent: number;
}

export interface StockDetail extends Stock {
  analysis: any[];
  news: any[];
}

/**
 * Fetch all KOSPI 200 codes and summaries
 */
export const useStocks = () => {
  return useQuery<Stock[]>({
    queryKey: ['stocks'],
    queryFn: async () => {
      const { data } = await axios.get('/data/codes.json');
      return data;
    },
  });
};

/**
 * Fetch detailed data for a specific stock
 */
export const useStockDetail = (code: string | null) => {
  return useQuery<StockDetail>({
    queryKey: ['stock', code],
    queryFn: async () => {
      if (!code) throw new Error('Stock code is required');
      const { data } = await axios.get(`/data/data${code}.json`);
      return data;
    },
    enabled: !!code, // Only run if code is provided
  });
};
