'use client'
import {useState} from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

type Product = {
    id: number;
    title: string;
    price: number;
    brand_id: number;
}

export default function DeleteProducts({product}: {product: Product}) {
    const [toggle, setToggle] = useState(false)
    const [deleting, isDeleting] = useState(false)
    const router = useRouter()
    const handleToggle = () => {
        setToggle(!toggle)
    }


    const handleDelete = async () => {
        isDeleting(true)
        axios.delete(`/api/products/${product.id}`)
        setToggle(false)
        router.refresh()
        isDeleting(false)
    }


  return (
    <div>
        <button className="btn btn-error" onClick={handleToggle}>Delete</button>
        <input type="checkbox" checked={toggle} onChange={handleToggle} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sure want to delete {product.title}</h3>
                    <div className="modal-action">
                        <button type="button" onClick={handleToggle} className="btn">Close</button>
                        {deleting ? <button type="button" className="btn loading">Deleting...</button> : <button type="button" onClick={() => handleDelete()} className="btn btn-primary">Delete</button>}
                    </div>
            </div>
        </div>
    </div>
  )
}