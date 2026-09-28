import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { PRODUCT_PAGE_TAG } from "@/sanity/lib/fetch";

type WebhookPayload = { _type?: string };

/**
 * Sanity webhook target: refreshes cached content as soon as an editor
 * publishes. Configure the webhook secret as SANITY_REVALIDATE_SECRET.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Missing secret" }, { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidateTag(PRODUCT_PAGE_TAG, "max");
  return NextResponse.json({ revalidated: true, type: body?._type ?? null });
}
