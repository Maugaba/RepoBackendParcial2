import { NextResponse } from 'next/server'
import axios from 'axios'

const API_URL = process.env.API_URL || 'http://127.0.0.1:8000/api'

export async function GET() {
  try {
    const response = await axios.get(`${API_URL}/products`)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const response = await axios.post(`${API_URL}/products`, data)
    return NextResponse.json(response.data)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}