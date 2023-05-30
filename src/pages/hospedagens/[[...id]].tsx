import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import style from "@/styles/HostingById.module.css"
import styleError from "@/styles/error.module.css"
import Image from "next/image"
import axios from "axios";
export default function HostingId() {
  const [error, setError] = useState<boolean>(true)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const router = useRouter()
  const [info, setInfo] = useState<any>()
  const [existInfo, setExistInfo] = useState<boolean>(false)



  const handleCall = useCallback(async () => {

    if(router.query.id){
       
      axios.get(`${process.env.NEXT_PUBLIC_REACT_BACK}/hospedagens/${router.query.id[0]}/${router.query.id[1]}`).then((res:any) => {
        const information = res.data
        setMainImage(information[0].photos[0].photo)
        setInfo(information)
        setExistInfo(true)
        console.log(existInfo)
      })
      .catch((err:any) => {
        setExistInfo(false)
        
      });

    }
  }, [existInfo])

  useEffect(() => {
    handleCall()
  }, [existInfo])

  if (!existInfo) {
    return (
      <>
          <Header />


        <div className={`${styleError.father}`}>
          <h1>Hospedagem não encontrada</h1>
          <h2>Por favor, tente mais tarde</h2>
          <button onClick={() => router.push("/")}>Voltar</button>
        </div>

      </>
    )
  }
  else{
  return (
    <>
        <Header />

      <div className={style.container}>
        <div className={style.allImages}>
          <div className={style.images}>
            {existInfo ?
              <img src={info[0].photos[0].photo} onClick={() => setMainImage(info[0].photos[0].photo)} alt="Hospedagem" width={500} height={500} />
              : null}

            {existInfo  ?
              info[0].photos.map((o: any, i: any) => {
                if(i!==0) return <img onClick={() => setMainImage(o.photo)} key={i} src={o.photo} alt="Hospedagem" width={198} height={198} />
                
              } )
              : null}
          </div>

          {mainImage ?
            <img src={mainImage} alt="Hospedagem" width={500} height={500} />
            : null}


        </div>
        <div className={style.info}>
          {existInfo ?
            <>
              <h1>{info[0].name}</h1>
              <div className={style.specifications}>
                <p>Detalhes da hospedagem:</p>
                <p>Nome: {info[0].name}</p>
                <p>Cidade: {info[0].city}</p>
                <p>Preço da diária: {info[0].price}</p>
                <p>Psicina: {info[0].pool ? "Sim" : "Não"}</p>
                <p>Ar Condicionado: {info[0].airConditioning ? "Sim" : "Não"}</p>
                <p>Estacionamento: {info[0].parking ? "Sim" : "Não"}</p>
                <p>Café da manhã: {info[0].breakfast?"Sim" : "Não"}:</p>
                <p>Descrição: {info[0].description}</p>
                
              </div>
              <p>R$: {parseFloat((info[0].price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
              <button className="self-center mt-12" onClick={()=>router.push("/passagens")}>Ver as passagens</button>
              
            </>
            : null}
        </div>

      </div>
    </>

  )}
}
