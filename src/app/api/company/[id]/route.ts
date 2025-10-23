import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prismaClient'

// GET /api/company/[id] - Get a specific company
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params 

  try {
    const company = await prisma.company.findUnique({
      where: { id }, 
      include: {
        media: true,
      },
    })

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error fetching company:', error)
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 }
    )
  }
}

// PUT /api/company/[id] - Update a specific company
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, website, logo, industry, founded, employees, location } = body

    const company = await prisma.company.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(website !== undefined && { website }),
        ...(logo !== undefined && { logo }),
        ...(industry !== undefined && { industry }),
        ...(founded !== undefined && { founded }),
        ...(employees !== undefined && { employees }),
        ...(location !== undefined && { location }),
      },
    })

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error updating company:', error)
    return NextResponse.json(
      { error: 'Failed to update company' },
      { status: 500 }
    )
  }
}

// DELETE /api/company/[id] - Delete a specific company
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.company.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Company deleted successfully' })
  } catch (error) {
    console.error('Error deleting company:', error)
    return NextResponse.json(
      { error: 'Failed to delete company' },
      { status: 500 }
    )
  }
}


