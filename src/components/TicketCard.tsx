import { useRouter } from "next/router"
import style from "../styles/Hosting.module.css"


export default function Cards({ index, ct, image, id, name, price, citya, cityd }: any) {
  const router = useRouter()

  if (index < ct) {
    return (
      <div onClick={() => router.push(`/passagens/${id}`)} className={style.locationsCard}>
        <img src={image} alt="Passagem" width={198} height={198} />
        <h2>{name}</h2>
        <p>R$ {parseFloat((price/100).toFixed(2)).toLocaleString('pt-BR', {currency: 'BRL', minimumFractionDigits: 2})}</p>
        <button>Ver detalhes da Passagem</button>
      </div>
    )
  }
  else {
    return <></>
  }
}