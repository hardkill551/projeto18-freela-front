import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AiOutlineFilter } from "react-icons/ai";
import CurrencyInput from "react-currency-input-field";
import Cards from "@/components/Cards";
import style from "@/styles/Hosting.module.css";

export default function Hosting() {
  const [filter, setFilter] = useState({ pool: false, airConditioning: false, parking: false, breakfast: false, price: { min: 0, max: 150000000 } });
  const [ct, setCt] = useState<number>(8);
  const [filterOn, setFilterOn] = useState<boolean>(false);
  const [filterPrice, setFilterPrice] = useState({ min: 0, max: 0 });
  const [topFilter, setTopFilter] = useState<string>("Destaques");
  const [hosting, setHosting] = useState<string[]>([])
  const router = useRouter();
  const [allHosting, setAllHosting] = useState<string[]>([])
  
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BACK}/hospedagens/${router.query.city}`)
      .then((res) => {
        
        const cardsReceived = res.data
        
        setAllHosting(cardsReceived.sort((a: any, b: any) => {
        return Number(b.id) - Number(a.id)
        }))
        setHosting(cardsReceived.sort((a: any, b: any) => {
        return Number(b.id) - Number(a.id)
        }))
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  },[]);
  return (
    <>
      <Header />

      <div className={style.container}>
        <AnimatePresence>
          {filterOn && (
            <motion.div
              className={style.filter}
              animate={{ x: 0, marginRight: 0 }}
              initial={{ x: -300, marginRight: -300 }}
              exit={{ x: -300, marginRight: -300 }}
              transition={{ duration: 1 }}
            >
              <div>
                <h1>Filtros</h1>
                <section onClick={() => setFilterOn(false)}>
                  <IoMdArrowRoundBack />
                </section>
              </div>
              <h1>Preço</h1>
              <div className={style.range}>
                <CurrencyInput
                  intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                  value={Number(filterPrice.min)}
                  onChange={(e) =>
                    setFilterPrice({
                      ...filterPrice,
                      min: Number(e.target.value.replace(/[^\d]/g, "")),
                    })
                  }
                  placeholder="R$ 10000,00"
                />
                <CurrencyInput
                  intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                  value={Number(filterPrice.max)}
                  onChange={(e) =>
                    setFilterPrice({
                      ...filterPrice,
                      max: Number(e.target.value.replace(/[^\d]/g, "")),
                    })
                  }
                  placeholder="R$ 1000000,00"
                />

                <button onClick={() => filterP()}>Filtrar</button>
                <h3 className={`m-6 mt-12 hover:cursor-pointer ${filter.pool?"font-bold":""}`} onClick={(e) => filtrar(e.target.innerHTML)}>Psicina</h3>
                <h3 className={`m-6  hover:cursor-pointer ${filter.breakfast?"font-bold":""}`} onClick={(e) => filtrar(e.target.innerHTML)}>Café da manhã</h3>
                <h3 className={`m-6  hover:cursor-pointer ${filter.airConditioning?"font-bold":""}`} onClick={(e) => filtrar(e.target.innerHTML)}>Ar condicionado</h3>
                <h3 className={`m-6  hover:cursor-pointer ${filter.parking?"font-bold":""}`} onClick={(e) => filtrar(e.target.innerHTML)}>Estacionamento</h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!filterOn && (
            <motion.section
              animate={{ y: 0 }}
              initial={{ y: -200 }}
              exit={{ x: -300 }}
              transition={{ duration: 1 }}
              className={style.goBack}
              onClick={() => setFilterOn(true)}
            >
              <AiOutlineFilter />
            </motion.section>
          )}
        </AnimatePresence>

        <div className={style.body}>
          <div className={style.locations}>
            <div className={style.div}>
              <h1>Destaques</h1>
              <select
                onChange={(e) => TopFilter(e.target.value)}
                name="Ordenar"
              >
                <option value="Destaques">Destaques</option>
                <option value="Nome A-Z">Nome A-Z</option>
                <option value="Nome Z-A">Nome Z-A</option>
                <option value="Preço menor - maior">Preço menor - maior</option>
                <option value="Preço maior - menor">Preço maior - menor</option>
              </select>
            </div>
            {hosting.length === 0 ? (
              <div className={style.locationsContainer}>
                <p className={style.noCars}>Não há Hospedagens!</p>
              </div>
            ) : (
              <div className={style.locationsContainer}>
                {hosting
                  .filter(
                    (o: any) =>
                      o.price <= Number(filter.price.max * 100) &&
                      o.price >= Number(filter.price.min * 100)
                  )
                  .map((o: any, i) => (
                    <Cards
                      key={i}
                      index={i}
                      ct={ct}
                      setCt={setCt}
                      name={o.name}
                      image={o.photos[0].photo}
                      id={o.id}
                      price={o.price}
                    />
                  ))}
              </div>
            )}

            {ct <= hosting.length ? (
              <div className={style.more}>
                <button onClick={() => setCt(ct + 8)}>Ver mais</button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
  function TopFilter(e: any) {
    setTopFilter(e);
    setHosting(
        hosting.sort((a: any, b: any) => {
        if (e === "Preço menor - maior") {
          return Number(a.price) - Number(b.price);
        }
        if (e === "Preço maior - menor") {
          return Number(b.price) - Number(a.price);
        }
        if (e === "Nome A-Z") {
          return a.name.localeCompare(b.name);
        }
        if (e === "Nome Z-A") {
          return b.name.localeCompare(a.name);
        }
        if (e === "Destaques") {
          return Number(b.id) - Number(a.id);
        }
      })
    );
    console.log(hosting)
  }

  function filterP() {
    setFilter({
      ...filter,
      price: { min: Number(filterPrice.min), max: Number(filterPrice.max) },
    });
  }

  function filtrar(item: any) {
    let filtro: any = allHosting;
    if (item === "Psicina") {
      filtro = filtro.filter((o: any) => {
        if(filter.pool) return true
        if (o.pool) {
          return true
        }else{
          return false
        }
      });

      setFilter({...filter, pool: !filter.pool})
    }
    if (item === "Estacionamento") {
      filtro = filtro.filter((o: any) => {
        if(filter.parking) return true
        if (o.parking) {
          return true
        }else{
          return false
        }
      });
      setFilter({...filter, parking: !filter.parking})
    }
    if (item === "Ar condicionado") {
      filtro = filtro.filter((o: any) => {
        if(filter.airConditioning) return true
        if (o.airConditioning) {
          return true
        }else{
          return false
        }
      });
      setFilter({...filter, airConditioning: !filter.airConditioning})
    }
    if (item === "Café da manhã") {
      filtro = filtro.filter((o: any) => {
        if(filter.breakfast) return true
        if (o.breakfast) {
          return true
        }else{
          return false
        }
      });
      setFilter({...filter, breakfast: !filter.breakfast})
    }
    
    TopFilter(topFilter);
    setHosting(filtro);
  }
}
