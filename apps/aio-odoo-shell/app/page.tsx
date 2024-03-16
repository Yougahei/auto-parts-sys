'use client';
import Link from "next/link";
import { buttonVariants } from "@ui/components/ui/button";
import { userStore } from "../stores/userInfo";


export default function Page() {
    const userInfo = userStore((state) => state.userInfo);

  return (
    <main className="mt-4 ml-20 mr-20">
        <h1>欢迎 { userInfo.name } 登录系统...</h1>
        <Link href={"/admin"} className={buttonVariants({variant: "default"})}>ADMIN</Link>
    </main>
  );
}
