import FilterCity from "@/components/FilterCity";
import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [cities, setCities] = useState<any>([]);
  const router = useRouter();
  const [type, setType] = useState<string>("");
  const [citySelected, setCitySelected] = useState<any>({
    cityDe: "",
    cityAr: "",
  });
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BACK}/cities`)
      .then((res) => {
        setCities(res.data);
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  }, [setCities, cities]);
  return (
    <>
      <Header />
      <main>
        <div className="w-full h-96 flex items-center justify-center">
          <form
            onSubmit={search}
            className="bg-emerald-500 w-[80%] flex h-12 items-center rounded-full justify-between"
          >
            {type ? (
              <FilterCity
                citySelected={citySelected}
                setCitySelected={setCitySelected}
                cities={cities}
                type={type}
              />
            ) : (
              <div className="flex pl-16 pr-16 justify-between w-full items-center">
                <h1>Deseja ver hospedagens ou passagens?</h1>
                <div>
                <button type="button" className="bg-cyan-400 ml-52 mr-20 w-32 h-12 rounded-full hover:bg-cyan-500" onClick={() => setType("hospedagens")}>
                  Hospedagens
                </button>
                <button type="button" className="bg-cyan-400 w-32 h-12 rounded-full hover:bg-cyan-500" onClick={() => setType("passagens")}>
                  Passagens
                </button>
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="flex w-full justify-evenly">
          <div className="bg-emerald-300 rounded-full w-96 h-96 flex items-center justify-center p-10 text-justify font-medium">
            1° Escolha a cidade que você deseja visitar!
          </div>
          <div className="bg-emerald-400 rounded-full w-96 h-96 flex items-center justify-center p-10 text-justify font-medium">
            2° Veja as passagens disponíveis com preços e datas
          </div>
          <div className="bg-emerald-500 rounded-full w-96 h-96 flex items-center justify-center p-10 text-justify font-medium">
            3° Vejo os locais aonde você pode se hospedar e todo o conforto que
            eles te oferecem!
          </div>
        </div>
      </main>
    </>
  );

  function search(e:any){
    e.preventDefault()
    router.push(`/${type}/${citySelected.cityDe}/${citySelected.cityAr}`)
  }
}
