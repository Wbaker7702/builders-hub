import { del, put } from '@vercel/blob';
import { NextResponse, NextRequest } from 'next/server';
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'invalid file' }, { status: 400 });
    }

    const typedFile = file as File;

    const blob = await put(typedFile.name, typedFile, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error('Error uploading file:', error);
    console.error('Error POST /api/file:', error.message);
    const wrappedError = error as Error;
    return NextResponse.json(
      { error: wrappedError },
      { status: wrappedError.cause == 'ValidationError' ? 400 : 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('fileName');
  const url = searchParams.get('url');

  // Validate fileName to prevent SSRF and path traversal
  // Allow only strict base file names like "myfile.txt", no slashes, no dots except one for the extension, no whitespace, 3-32 chars total, extension 2-8 chars
  const isValidFileName = (
    typeof fileName === 'string' &&
    /^[a-zA-Z0-9_-]{1,24}\.[a-zA-Z0-9]{2,8}$/.test(fileName) && // only alphanumerics, underscore, dash, and one dot for extension
    !fileName.includes('/') &&
    !fileName.includes('\\') &&
    !fileName.includes('..')
  );

  if (url){
    return NextResponse.json({message: 'URL delete is not supported'})
  }

  if (!isValidFileName && !url) {
    return NextResponse.json(
      { error: 'A valid fileName or URL is required' },
      { status: 400 }
    );
  }

  if (!fileName && !url) {
    return NextResponse.json(
      { error: 'fileName or URL is required' },
      { status: 400 }
    );
  }

  try {
    // Defensive: Ensure BLOB_BASE_URL is safe and matches expected value (optional, but recommended)
    const allowedBlobBase = process.env.BLOB_BASE_URL;
    if (!allowedBlobBase || !/^https:\/\/[a-zA-Z0-9.-]+(\:[0-9]+)?\/?$/.test(allowedBlobBase)) {
      throw new Error('Internal configuration error: invalid BLOB_BASE_URL');
    }

    // Construct the URL safely
    const fetchUrl = `${allowedBlobBase.replace(/\/$/, '')}/${encodeURIComponent(fileName)}`;
    const blobExists = await fetch(fetchUrl, {
      method: 'HEAD',
    }).then(res => res.ok).catch(() => false);

    if (!blobExists) {
      return NextResponse.json(
        { message: 'The file does not exist or has already been deleted' },
        { status: 404 }
      );
    }

    await del(fileName || url!, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Error deleting file' }, { status: 500 });
  }
}
