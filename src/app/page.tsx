import { redirect } from "next/navigation";

export default function Home() {
  redirect("/loads");
  return null;
}