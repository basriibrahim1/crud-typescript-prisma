'use client'
import {SyntheticEvent ,useState} from 'react';
import { useRouter } from 'next/navigation';
import type {Brand} from '@prisma/client';
import axios from 'axios';

type Product = {
    id: number;
    title: string;
    price: number;
    brand_id: number;
}

export default function EditProduct({brands, products}: { brands:Brand[]; products: Product }) {
    const [toggle, setToggle] = useState(false)
    const [title, setTitle] = useState(products.title)
    const [price, setPrice] = useState(products.price)
    const [brand, setBrand] = useState(products.brand_id)
    const [saving, isSaving] = useState(false)
    const router = useRouter()

    const handleToggle = () => {
        setToggle(!toggle)
    }
    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault()
        isSaving(true)
        await axios.patch(`/api/products/${products.id}`, {
            title: title,
            price: Number(price),
            brand_id: Number(brand)
        })
        isSaving(false)
        router.refresh()
        setToggle(false)
    }


  return (
    <div>
        <button className="btn btn-info" onClick={handleToggle}>Edit</button>
        <input type="checkbox" checked={toggle} onChange={handleToggle} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Product</h3>
                <form onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="Product Name"/>
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input w-full input-bordered" placeholder="Price"/>
                    </div>
                        <div className="form-control">
                        <label className="label font-bold">Brand</label>
                        <select className='select select-bordered' value={brand} onChange={(e) => setBrand(Number(e.target.value))}>
                            {brands.map(item => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="modal-action">
                        <button type="button" onClick={handleToggle} className="btn">Close</button>
                        {saving ? <button type="button" className="btn loading">Saving...</button> : <button type="submit" className="btn btn-primary">Save</button>}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}