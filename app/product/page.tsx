import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProducts from "./deleteProduct";
import EditProduct from "./editProduct";
import ProductLayout from "./layout";
const prisma = new PrismaClient()

const getProducts = async() => {
    const res = await prisma.product.findMany({
        select: {
            id: true,
            title: true,
            price: true,
            brand: true,
            brand_id: true
        }
    })
    return res
}

const getBrands = async () => {
    const res = await prisma.brand.findMany()
    return res
}

export default async function Product() {
    const [product, brand] = await Promise.all([
        getProducts(),
        getBrands()
    ])


  return (
    <ProductLayout>
        <AddProduct brands={brand}/>
        <table className="table w-full mt-10">
            <thead className="text-center">
                <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Brand</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {product.map((item, index) => (
                    <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.brand.name}</td>
                    <td className="flex space-x-5 justify-center items-center">
                        <EditProduct brands={brand} products={item}/>
                        <DeleteProducts product={item}/>
                    </td>
                </tr>
                ))}      
            </tbody>
        </table>
    </ProductLayout>
  )
}
