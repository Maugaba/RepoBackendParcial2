import { NextResponse } from 'next/server'
import axios from 'axios'

const API_URL = process.env.API_URL || 'http://127.0.0.1:8000/api'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const response = await axios.get(`${API_URL}/products/${params.id}`)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const response = await axios.put(`${API_URL}/products/${params.id}`, data)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await axios.delete(`${API_URL}/products/${params.id}`)
    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}