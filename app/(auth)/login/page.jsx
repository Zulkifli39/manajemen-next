import {redirect} from "next/navigation";
import {getUser} from "@/lib/auth";
import ContextAuth from "../../context/ContextAuth";

export default async function LoginPage() {
  const auth = await getUser(); // ini jalan di server

  if (auth && auth.role === "pemilik") {
    redirect("/dashboard");
  }

  return <ContextAuth type="login" />;
}
