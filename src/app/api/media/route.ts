import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prismaClient'

// GET /api/media - Get all media content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const mediaType = searchParams.get('media_type')
    const tag = searchParams.get('tag')
    const companyId = searchParams.get('company_id')


    const where = {
      ...(mediaType && { media_type: mediaType }),
      ...(tag && { tag: tag }),
      ...(companyId && { company_id: companyId }),
    }

    const [media, total] = await Promise.all([
      prisma.media.findMany({
       
        include: {
          campany: {
            select: {
              id: true,
              name: true,
              msp_profile_picture: true,
            },
          },
        },
        orderBy: { id: 'desc' },
      }),
      prisma.media.count({  }),
    ])

    return NextResponse.json({
      media,
      pagination: {
        page,

        total,
      },
    })
  } catch (error) {
    console.error('Error fetching media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}

// POST /api/media - Create new media content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company_id, media_url, tag, media_type } = body

    if (!company_id || !media_url || !tag || !media_type) {
      return NextResponse.json(
        { error: 'Company ID, media URL, tag, and media type are required' },
        { status: 400 }
      )
    }

    const media = await prisma.media.create({
      data: {
        company_id,
        media_url,
        tag,
        media_type,
      },
      include: {
        campany: {
          select: {
            id: true,
            name: true,
            msp_profile_picture: true,
          },
        },
      },
    })

    return NextResponse.json(media, { status: 201 })
  } catch (error) {
    console.error('Error creating media:', error)
    return NextResponse.json(
      { error: 'Failed to create media content' },
      { status: 500 }
    )
  }
}

