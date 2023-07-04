import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token")!;

    router.replace(token ? "/admin/barang" : "/admin/login");
  }, [router]);

  return null;
}

export const adminRequestConfig = () => ({
  headers: {
    Authorization: `Basic ${localStorage.getItem("token")}`,
  },
});
