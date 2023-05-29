import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [cities, setCities] = useState<any>([])

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_REACT_BACK}cities`).then((res)=>{
      setCities(res.data)
    }
    ).catch((err)=>{
      console.log(err.response.message)
    })
  },[])
  return (
    <>
      <Header />
      <div>
        <div className="w-full h-96 flex items-center justify-center">
          <div className="bg-emerald-500 w-[80%] flex h-12 items-center rounded-full justify-between">
          <div className="h-12 ml-10 flex items-center">
            <label htmlFor="cityDe">Cidade de origem:</label>
            <select className="h-10 ml-6" name="Cidade de origem" id="cityDe">
              <option>Selecione uma opção</option>
              {cities.map((o:any, i:number) => (
                <option value={o.name} key={i}>{o.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cityAr">Cidade de destino:</label>
            <select className="h-10 ml-6" name="Cidade de destino" id="cityAr">
              <option value={"select"}>Selecione uma opção</option>
              {cities.map((o:any, i:number) => (
                <option value={o.name} key={i}>{o.name}</option>
              ))}
            </select>
          </div>
          <button className="bg-cyan-400 w-32 h-12 rounded-full hover:bg-cyan-500">Pesquisar</button>
          </div>
        </div>
        <div className="flex w-full justify-evenly">
          <div className="bg-emerald-300 rounded-full w-96 h-96 flex items-center justify-center p-10 text-justify font-medium">1° Escolha a cidade que você deseja visitar!</div>
          <div className="bg-emerald-400 rounded-full w-96 h-96 flex items-center justify-center p-10 text-justify font-medium">2° Veja as passagens disponíveis com preços e datas</div>
          <div className="bg-emerald-500 rounded-full w-96 h-96 flex items-center justify-center p-10 text-justify font-medium">3° Vejo os locais aonde você pode se hospedar e todo o conforto que eles te oferecem!</div>
        </div>
      </div>
    </>
  );
}
