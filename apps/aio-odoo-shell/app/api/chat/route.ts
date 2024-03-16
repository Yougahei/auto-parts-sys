import { NextRequest } from "next/server";

const encoder = new TextEncoder();

export async function POST(req: NextRequest) {
    try {
        return new Response(await iteratorToStream(makeIterator(`你好，我是AI助手`)),{
            headers: { 'Content-Type': 'text/event-stream' },
        })
    } catch (error) {
        console.error(error);
    }
}

function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

async function* makeIterator(texts: string): AsyncGenerator<Uint8Array, void, unknown> {
    for (const text of texts) {
        yield encoder.encode(`data: ${text}\n\n`)
        await sleep(200)
    }
    yield encoder.encode(`data: [DONE]\n\n`)
}

async function iteratorToStream(iterator: AsyncGenerator<Uint8Array, void, unknown>) {
    return new ReadableStream({
        async pull(controller) {
            const { value, done } = await iterator.next()

            if (done) {
                controller.close()
            } else {
                // console.log(decoder.decode(value));
                controller.enqueue(value)
            }
        },
    })
}
