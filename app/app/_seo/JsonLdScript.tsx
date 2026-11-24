import type { JsonLdNode } from "./jsonld";

/** Serialise JSON-LD for an inline script, escaping `<` so content cannot close the tag. */
export function serializeJsonLd(data: JsonLdNode | readonly JsonLdNode[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Renders one or more JSON-LD nodes as an application/ld+json script. */
export default function JsonLd({ data }: { data: JsonLdNode | readonly JsonLdNode[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
