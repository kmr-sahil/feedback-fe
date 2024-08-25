"use server";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-textColor text-center gap-4">
      <h2 className="text-[0.85rem] italic">
        landing page on the way,<br></br> till then explore the product...
      </h2>
      <Link href={"/signin"}>
        <CustomButton label={"Explore"} />
      </Link>
    </div>
  );
}
