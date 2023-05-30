import { useRouter } from "next/router"
import style from "../styles/Hosting.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Cards({ index, ct, image, id, name, price, city }: any) {
  const router = useRouter()

  if (index < ct) {
    return (
      <div onClick={() => router.push(`/hospedagens/${city}/${id}`)} className={style.locationsCard}>
        <img src={image} alt="Hospedagem" width={198} height={198} />
        <h2>{name}</h2>
        <p>R$ {parseFloat((price/100).toFixed(2)).toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits: 2})}</p>
        <button>Ver detalhes da hospedagem</button>
      </div>
    )
  }
  else {
    return <></>
  }
}