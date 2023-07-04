import axios from "axios";
import Login from "components/Login";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AdminLogin = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token")!;

    if (token) router.replace("/admin/barang");
  }, [router]);

  const handleSubmit = async (username: string, password: string) => {
    if (username.length <= 0 || password.length <= 0) return "Wajib diisi";

    try {
      const { data } = await axios.post(
        "https://narauction.et.r.appspot.com/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", data.token);
      router.replace("/admin/barang");

      return undefined;
    } catch {
      return "Username atau password salah";
    }
  };

  return <Login onSubmit={handleSubmit} />;
};

export default AdminLogin;
