import ProductForm from '../../components/ProductForm'

export default function NewProduct() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nuevo Producto</h1>
      <ProductForm />
    </div>
  )
}