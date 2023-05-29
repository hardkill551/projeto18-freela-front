import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter()
    return (
      <>
        <div className="w-full h-20 bg-emerald-400 flex items-center">
            <button className="ml-10 bg-cyan-400 w-60 h-10 rounded-full" onClick={()=> router.push("/")}>VIAGEM COM CONFORTO</button>
        </div>
      </>
    );
  }