'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Product } from '../types'

const schema = yup.object({
  name: yup.string().required('El nombre es requerido'),
  description: yup.string().required('La descripción es requerida'),
  price: yup.number().positive('El precio debe ser positivo').required('El precio es requerido'),
  stock: yup.number().integer('El stock debe ser un número entero').min(0, 'El stock no puede ser negativo').required('El stock es requerido'),
  sku: yup.string().required('El SKU es requerido'),
  category: yup.string().required('La categoría es requerida'),
  especial_price: yup.string().nullable(),
}).required()

type ProductFormProps = {
  product?: Product
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: product,
  })

  const onSubmit = async (data: Product) => {
    try {
      if (product) {
        await axios.put(`/api/products/${product.id}`, data)
      } else {
        await axios.post('/api/products', data)
      }
      router.push('/')
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">Nombre</label>
        <input {...register('name')} id="name" className="w-full border rounded p-2" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">Descripción</label>
        <textarea {...register('description')} id="description" className="w-full border rounded p-2" />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>
      <div>
        <label htmlFor="price" className="block mb-1">Precio</label>
        <input {...register('price')} id="price" type="number" step="0.01" className="w-full border rounded p-2" />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <div>
        <label htmlFor="stock" className="block mb-1">Stock</label>
        <input {...register('stock')} id="stock" type="number" className="w-full border rounded p-2" />
        {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
      </div>
      <div>
        <label htmlFor="sku" className="block mb-1">SKU</label>
        <input {...register('sku')} id="sku" className="w-full border rounded p-2" />
        {errors.sku && <p className="text-red-500">{errors.sku.message}</p>}
      </div>
      <div>
        <label htmlFor="category" className="block mb-1">Categoría</label>
        <input {...register('category')} id="category" className="w-full border rounded p-2" />
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>
      <div>
        <label htmlFor="especial_price" className="block mb-1">Precio Especial</label>
        <input {...register('especial_price')} id="especial_price" className="w-full border rounded p-2" />
        {errors.especial_price && <p className="text-red-500">{errors.especial_price.message}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {product ? 'Actualizar' : 'Crear'} Producto
      </button>
    </form>
  )
}