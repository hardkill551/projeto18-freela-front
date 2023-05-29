import Header from "@/components/Header";

export default function Home() {
  const cidades = [
    { name: "São paulo" },
    { name: "Argentina" },
    { name: "Brasília" },
  ];

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
              {cidades.map((o, i) => (
                <option>{o.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cityAr">Cidade de destino:</label>
            <select className="h-10 ml-6" name="Cidade de destino" id="cityAr">
              <option value={"select"}>Selecione uma opção</option>
              {cidades.map((o, i) => (
                <option value={o.name}>{o.name}</option>
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
