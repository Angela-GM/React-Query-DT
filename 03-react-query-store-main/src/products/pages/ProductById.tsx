import { useParams } from "react-router-dom"
import { ProductCard, useProduct } from ".."
import { useEffect } from "react";


export const ProductById = () => {

  const { id } = useParams();

  const { product, isLoading } = useProduct({ id: +id! });

//   efecto para que al inicio de la carga el scroll se pongo la en la posicion 0 0 (arriba del todo)
  useEffect(() => {
    window.scrollTo(0,0);
  },[])

  

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto</h1>

      { isLoading && <p>Cargando...</p> }

      {
        product && (<ProductCard product={ product } fullDescription />)
      }
      

    </div>
  )
}