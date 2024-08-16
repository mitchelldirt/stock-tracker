import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getStock } from "../queries/stocks";

type Input = {
  stock: string;
};

export default function StockSearcher() {
  const [storedStockValue, setStoredStockValue] = useLocalStorage("stock", "");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      stock: storedStockValue || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (symbol: string) => getStock(symbol),
    onSuccess: (data) => {
      // Handle successful query
      console.log(data);
      // Optionally invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
  });

  const onSubmit: SubmitHandler<Input> = (data) => {
    mutation.mutate(data.stock);
  };

  const stockValue = watch("stock");

  useEffect(() => {
    if (typeof stockValue === "string" && stockValue != storedStockValue) {
      setStoredStockValue(stockValue);
    }
  }, [setStoredStockValue, stockValue, storedStockValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={""} {...register("stock", { required: true })} />

      {errors.stock && <span>This field is required</span>}
      <button type="submit">Search</button>
    </form>
  );
}
