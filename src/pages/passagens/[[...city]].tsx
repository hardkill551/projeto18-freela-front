import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Tickets() {
    const router = useRouter()
    useEffect(()=>{
        console.log(router.query.city)
    })
  return (
    <>
      <Header />
    </>
  );
}
