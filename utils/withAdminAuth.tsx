import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default (Component) =>
  function WithAdminAuth() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      const token = localStorage.getItem("token")!;

      if (!token) router.replace("/admin/login");

      setLoading(false);
    }, [router]);

    if (loading) return null;
    return <Component />;
  };
