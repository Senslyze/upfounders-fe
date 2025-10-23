import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prismaClient'

// GET /api/company - Get all companies
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const industry = searchParams.get('industry')
    const search = searchParams.get('search')
    const focusArea = searchParams.get('focus_area')
    const serviceModel = searchParams.get('service_model')

    const where = {
      ...(industry && { industries: { has: industry } }),
      ...(focusArea && { focus_areas: { has: focusArea } }),
      ...(serviceModel && { service_models: { has: serviceModel } }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    }

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        where,
        include: {
          media: true,
        },
        orderBy: { created_at: 'desc' },
      }),
      prisma.company.count({ where }),
    ])

    return NextResponse.json({
      companies,
      pagination: {
        page,
      
        total,
      },
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
}

// POST /api/company - Create a new company
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      id,
      name, 
      description, 
      company_website, 
      countries = [],
      diverse_owned_identities = [],
      facebook_platforms = [],
      focus_areas = [],
      industries = [],
      is_badged = false,
      language_tags = [],
      msp_profile_picture,
      service_models = [],
      solution_types = [],
      solution_subtypes = [],
      minimum_spend,
      typename = "company"
    } = body

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Company name and description are required' },
        { status: 400 }
      )
    }

    const company = await prisma.company.create({
      data: {
        id: id || undefined, // Let Prisma generate if not provided
        name,
        description,
        company_website,
        countries,
        diverse_owned_identities,
        facebook_platforms,
        focus_areas,
        industries,
        is_badged,
        language_tags,
        msp_profile_picture,
        service_models,
        solution_types,
        solution_subtypes,
        minimum_spend,
        typename,
      },
    })

    return NextResponse.json(company, { status: 201 })
  } catch (error) {
    console.error('Error creating company:', error)
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    )
  }
}

