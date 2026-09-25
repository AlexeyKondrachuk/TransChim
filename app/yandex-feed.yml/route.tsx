import { SITE } from "@/components/config/site";

export const dynamic = "force-dynamic";

const products = [
  {
    id: "svarochnaya-smes-k18",
    name: "Сварочная смесь K18",
    url: "/products/svarochnaya-smes-k18",
    price: 3300,
    picture: "/images/arco2.webp",
    description:
      "Сварочная смесь K18 для сварки углеродистых и низколегированных сталей.",
  },
  {
    id: "argon",
    name: "Аргон",
    url: "/products/argon",
    price: 3500,
    picture: "/images/argon.webp",
    description:
      "Аргон для сварочных и промышленных работ.",
  },
] as const;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const offers = products
    .map(
      (product) => `    <offer id="${escapeXml(product.id)}" available="true">
      <name>${escapeXml(product.name)}</name>
      <url>${SITE.url}${escapeXml(product.url)}</url>
      <price>${product.price}</price>
      <currencyId>RUR</currencyId>
      <categoryId>1</categoryId>
      <picture>${SITE.url}${escapeXml(product.picture)}</picture>
      <description>${escapeXml(product.description)}</description>
    </offer>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${new Date().toISOString()}">
  <shop>
    <name>${escapeXml(SITE.name)}</name>
    <company>${escapeXml(SITE.legalName)}</company>
    <url>${SITE.url}</url>

    <currencies>
      <currency id="RUR" rate="1"/>
    </currencies>

    <categories>
      <category id="1">Технические газы</category>
    </categories>

    <offers>
${offers}
    </offers>
  </shop>
</yml_catalog>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}