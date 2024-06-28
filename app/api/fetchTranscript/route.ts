import { NextRequest, NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'Invalid video ID' }, { status: 400 });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const transcriptText = transcript.map(entry => entry.text).join(' ');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
            'x-api-key': `${process.env.ANTHROPIC_API_KEY}`,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
            },
            body: JSON.stringify({
            model: "claude-3-haiku-20240307",
            max_tokens: 1500,
            temperature: 0,
            messages: [
            {
                role: "user",
                content: [
                {
                    type: "text",
                    text: `Create a blog post in markdown format based on the following transcript:\n\n${transcriptText}, Additionally, add a title in <title> tag and slug in <slug> tag.`,
                }
                ],
            }
        ],
      }),
    });

    const res = await response.json();
    const blogPost = res.content[0].text;

    return NextResponse.json({ blogPost });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}