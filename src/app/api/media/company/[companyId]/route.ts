import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/prismaClient'

export async function GET(
  _request: Request,
  { params }: { params: { companyId: string } }
) {
  const { companyId } = params

  try {
    const media = await prisma.media.findMany({
      where: { company_id: companyId },
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
    })

    if (!media.length) {
      return NextResponse.json({ error: 'No media found' }, { status: 404 })
    }

    return NextResponse.json({ companyId, media })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}
