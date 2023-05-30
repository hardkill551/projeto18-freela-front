import { useRouter } from "next/router";

export default function FilterCity({setCitySelected, citySelected, cities, type}:any) {
  const router = useRouter()
    return (
      <>
      {type==="passagens"&&<div className="h-12 ml-10 flex items-center">
              <label htmlFor="cityDe">Cidade de origem:</label>
              <select
                className="h-10 ml-6"
                name="Cidade de origem"
                id="cityDe"
                onChange={(e) =>
                  setCitySelected({ ...citySelected, cityDe: e.target.value })
                }
              >
                <option>Selecione uma opção</option>
                {cities.map(
                  (o: any, i: number) =>
                    o.name !== citySelected.cityAr && (
                      <option value={o.name} key={i}>
                        {o.name}
                      </option>
                    )
                )}
              </select>
            </div>}
            
            <div className={type!=="passagens"?"pl-16":""}>
              <label htmlFor="cityAr">Cidade de destino:</label>
              <select
                className="h-10 ml-6"
                name="Cidade de destino"
                id="cityAr"
                onChange={(e) =>
                  setCitySelected({ ...citySelected, cityAr: e.target.value })
                }
              >
                <option value={"select"}>Selecione uma opção</option>
                {cities.map(
                  (o: any, i: number) =>
                    o.name !== citySelected.cityDe && (
                      <option value={o.name} key={i}>
                        {o.name}
                      </option>
                    )
                )}
              </select>
            </div>
            <div>
            <button type="submit" className="bg-cyan-400 w-32 h-12 rounded-full hover:bg-cyan-500">
              Pesquisar {type}
            </button>
            </div>
      </>
    );
  }