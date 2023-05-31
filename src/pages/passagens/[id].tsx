import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import style from "@/styles/HostingById.module.css"
import styleError from "@/styles/error.module.css"
import axios from "axios";
export default function HostingId() {
  const [error, setError] = useState<boolean>(true)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const router = useRouter()
  const [info, setInfo] = useState<any>()
  const [existInfo, setExistInfo] = useState<boolean>(false)



  const handleCall = useCallback(async () => {
    if(router.query.id){
       
      axios.get(`${process.env.NEXT_PUBLIC_REACT_BACK}/passagens/${router.query.id}`).then((res:any) => {
        const information = res.data
        setMainImage(information[0].photos[0].photo)
        setInfo(information)
        setExistInfo(true)
        console.log(information)
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
          <h1>Passagem não encontrada</h1>
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
                <p>Detalhes da passagem:</p>
                <p>Companhia aérea: {info[0].companyName}</p>
                <p>Cidade de partida: {info[0].cityDeName}</p>
                <p>Cidade destino: {info[0].cityArName}</p>
                <p>Preço da diária: {parseFloat((info[0].price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
                <p>Data de saída: {info[0].timeDe.substring(0,10)}</p>
                <p>Horário de saída: {info[0].timeDe.substring(11,16)}</p>
                <p>Data de volta: {info[0].timeAr.substring(0,10)}</p>
                <p>Horário da volta: {info[0].timeAr.substring(11,16)}</p>
                
              </div>
              <p>R$: {parseFloat((info[0].price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
              <button className="self-center mt-12" onClick={()=>router.push("/")}>Ver as hospedagens</button>
              
            </>
            : null}
        </div>

      </div>
    </>

  )}
}
