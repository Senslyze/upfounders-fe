import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prismaClient'

// GET /api/consultancy - Get all consultation requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const businessType = searchParams.get('business_type')
    const interestMedia = searchParams.get('interest_media')

    const skip = (page - 1) * limit

    const where = {
      ...(businessType && { business_type: businessType }),
      ...(interestMedia && { interest_media: { has: interestMedia } }),
    }

    const [consultations, total] = await Promise.all([
      prisma.consultancy_requests.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.consultancy_requests.count({ where }),
    ])

    return NextResponse.json({
      consultations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching consultations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consultations' },
      { status: 500 }
    )
  }
}

// POST /api/consultancy - Create a new consultation request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company_name, business_type, interest_media = [], user_query } = body

    if (!name || !email || !company_name || !business_type || !user_query) {
      return NextResponse.json(
        { error: 'Name, email, company name, business type, and user query are required' },
        { status: 400 }
      )
    }

    const consultation = await prisma.consultancy_requests.create({
      data: {
        name,
        email,
        company_name,
        business_type,
        interest_media,
        user_query,
      },
    })

    return NextResponse.json(consultation, { status: 201 })
  } catch (error) {
    console.error('Error creating consultation:', error)
    return NextResponse.json(
      { error: 'Failed to create consultation request' },
      { status: 500 }
    )
  }
}

