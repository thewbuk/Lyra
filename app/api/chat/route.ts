import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { type Message } from 'ai';

interface FileData {
  type: 'file';
  data: number[];
  mimeType: string;
}

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, fileData }: { messages: Message[]; fileData?: FileData } =
    await req.json();

  // Process messages to include file data
  const processedMessages = messages.map((message) => {
    if (
      message.role === 'user' &&
      typeof message.content === 'string' &&
      message.content.includes("I've uploaded a PDF document") &&
      fileData
    ) {
      return {
        role: message.role,
        content: message.content + '\n[PDF document analysis in progress]',
        files: [
          {
            type: 'file',
            data: new Uint8Array(fileData.data),
            mimeType: fileData.mimeType,
          },
        ],
      };
    }
    return message;
  });

  try {
    const result = streamText({
      model: openai('gpt-4-turbo-preview'),
      messages: processedMessages,
      maxSteps: 5,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat completion:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get AI response' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
