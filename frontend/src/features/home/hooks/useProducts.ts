import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import type { Product } from '../../../types/product';

export const useProducts = (initialQuery = "") => {
  console.log("Home => useProducts re called")
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<string>(initialQuery);
  const [limit] = useState<number>(10);
  const [skip, setSkip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);
      setError("");

      const res = await getProducts({
        limit,
        skip: reset ? 0 : skip,
        q: query || undefined,
      });
      if (reset) {
        setData(res?.products);
        setSkip(0);
      } else {
        setData((prev) => [...prev, ...res?.products])
      }
      setTotal(res?.total);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // initial search trigger 
  useEffect(() => {
    fetchProducts(true);
  }, [query]);

  // load more 
  const loadMore = () => {
    if (data?.length >= total) return;
    setSkip((prev) => prev + limit)
  }

  // fetch when skip change 
  useEffect(() => {
    if (skip === 0) return;
    fetchProducts();
  }, [skip])

  return {
    data,
    loading,
    error,
    query,
    setQuery,
    loadMore,
    hasMore: data.length < total,
  };
};