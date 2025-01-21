import {  ActionFunctionArgs, Form, useNavigate , redirect } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductServices";

type ProductDetailProps = {
    product: Product
}

export async function action({params} : ActionFunctionArgs) {
    
    const { id } = params
    if(id !== undefined){
        await deleteProduct(+id)
        return redirect('/')
    }
  }


export default function ProductDetail({product} : ProductDetailProps) {
    
    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
    <>
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {isAvailable ? 'Disponible' : 'No Disponible'}
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className="flex gap-2 items-center">
            <button
                // to={`/products/${product.id}/edit`}
                className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                onClick={() => navigate(`/products/${product.id}/edit`)}
            >Editar</button>
            <Form 
                className="w-full"
                method="POST"
                action={`products/${product.id}/delete`}
                onSubmit={ (e) => {
                    if(!confirm('Eliminar?')) {
                        e.preventDefault()
                    }
                }}
            >
                <input 
                    type="submit"
                    value='Eliminar'
                    className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                />
            </Form>
           </div>
        </td>
    </tr> 
    </>
  )
}
