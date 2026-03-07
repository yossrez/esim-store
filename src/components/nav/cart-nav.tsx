import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import activeNav from "@/lib/active-nav";
import { useCartItemTotalQuery } from "@/network/api-hooks/query";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function CartNav({ iconSize = 22 }: { iconSize?: number }) {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const { data, isLoading, isError } = useCartItemTotalQuery();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["cart", "total"] });
  }, [pathname, queryClient]);

  return (
    <Link href="/cart">
      <div className="relative">
        <ShoppingCart
          size={iconSize}
          color={activeNav(pathname, "/cart")}
          className="w-6 mx-3.5 h-10"
        />

        {isLoading ||
        isError ||
        data === undefined ||
        data === null ||
        data.data.total <= 0 ? null : (
          <div className="absolute right-0 top-0 flex justify-center items-center text-xs bg-active text-white rounded-full h-5.5 w-6">
            <span>{data.data.total > 9 ? 9 + "+" : data.data.total}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
