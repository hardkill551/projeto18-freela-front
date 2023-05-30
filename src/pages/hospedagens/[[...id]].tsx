import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from "@/styles/HostingById.module.css"
import styleError from "@/styles/error.module.css"
import Image from "next/image"
import axios from "axios";
export default function HostingId() {
  const [error, setError] = useState<boolean>(true)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const router = useRouter()
  const [info, setInfo] = useState<any>()





  useEffect(() => {
    if(router.query.id){
      setError(false)
      axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BACK}/hospedagens/${router.query.id[0]}/${router.query.id[1]}`)
      .then((res) => {
        
        const info = res.data
        setMainImage(info.photo[0].photo)
        setInfo(info)
      })
      .catch((err) => {
        setError(true)
        
      });
    }
    
  }, [router, error])

  if (error) {
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
            {info ?
              <Image src={info.photos[0].photo} onClick={() => setMainImage(info.photos[0].photo)} alt="Hospedagem" width={500} height={500} />
              : null}

            {info ?
              info.photo.map((o: any, i: any) => <Image onClick={() => setMainImage(o.photo)} key={i} src={o.phoyo} alt="Hospedagem" width={198} height={198} />)
              : null}
          </div>

          {mainImage ?
            <Image src={mainImage} alt="Hospedagem" width={500} height={500} />
            : null}


        </div>
        <div className={style.info}>
          {info ?
            <>
              <h1>{info.title}</h1>
              <div className={style.specifications}>
                <p>Detalhes da hospedagem:</p>
                <p>Nome: {info.name}</p>
                <p>Cidade: {info.city}</p>
                <p>Preço da diária: {info.price}</p>
                <p>Psicina: {info.pool}</p>
                <p>Ar Condicionado: {info.airConditioning}</p>
                <p>Estacionamento: {info.parking}</p>
                <p>Descrição: {info.description}</p>
              </div>
              <p>R$: {parseFloat((info.price / 100).toFixed(2)).toLocaleString('pt-BR', { currency: 'BRL', minimumFractionDigits: 2 })}</p>
              <button onClick={()=>router.push("/passagens")}>Ver as passagens</button>
              
            </>
            : null}
        </div>

      </div>
    </>

  )}
}
