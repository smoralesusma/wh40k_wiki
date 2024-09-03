"use client";

import { FCC } from "@/lib/types/tools.types";
import { Routes } from "@/src/enums/routes.enum";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminLayout: FCC = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "admin") {
      router.push(Routes.HOME);
    }
  }, [session, status]);

  if (status === "loading" || !session || session.user.role !== "admin") {
    return <div>Loading...</div>;
  }

  return children;
};

export default AdminLayout;
