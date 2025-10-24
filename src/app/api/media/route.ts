import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prismaClient'
import { MediaType, MediaTag } from '@prisma/client'

// GET /api/media - Get all media content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const mediaTypeParam = searchParams.get('media_type')
    const tagParam = searchParams.get('tag')
    const companyId = searchParams.get('company_id')

    // Validate enum values
    const mediaType = mediaTypeParam && Object.values(MediaType).includes(mediaTypeParam as MediaType) 
      ? mediaTypeParam as MediaType 
      : undefined
    const tag = tagParam && Object.values(MediaTag).includes(tagParam as MediaTag) 
      ? tagParam as MediaTag 
      : undefined

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where: {
          ...(mediaType && { media_type: mediaType }),
          ...(tag && { tag: tag }),
          ...(companyId && { company_id: companyId }),
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
        orderBy: { id: 'desc' },
      }),
      prisma.media.count({
        where: {
          ...(mediaType && { media_type: mediaType }),
          ...(tag && { tag: tag }),
          ...(companyId && { company_id: companyId }),
        },
      }),
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

    // Validate enum values
    if (!Object.values(MediaType).includes(media_type)) {
      return NextResponse.json(
        { error: 'Invalid media type. Must be IMAGE or VIDEO' },
        { status: 400 }
      )
    }
    if (!Object.values(MediaTag).includes(tag)) {
      return NextResponse.json(
        { error: 'Invalid tag. Must be LOGO or MEDIA' },
        { status: 400 }
      )
    }

    const media = await prisma.media.create({
      data: {
        company_id,
        media_url,
        tag: tag as MediaTag,
        media_type: media_type as MediaType,
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

