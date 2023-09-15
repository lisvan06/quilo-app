import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "../../lib/cloudinary";
import { getImage } from "../../lib/formidable";
import { prisma } from "../../lib/prisma/_base";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextRequest, res: NextResponse) {
  const imageUploaded = await getImage(req);

  const imageData = await uploadImage(imageUploaded.path);

  const result = await prisma.image.create({
    data: {
      publicId: imageData.public_id,
      format: imageData.format,
      version: imageData.version.toString(),
    },
  });

  return NextResponse.json({ data: result }, { status: 200 });
}
