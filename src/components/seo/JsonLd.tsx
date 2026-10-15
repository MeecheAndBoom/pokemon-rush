/**
 * Renders a JSON-LD structured-data block.
 *
 * `<` is escaped so that a stray `</script>` inside the data can never break out
 * of the script element.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
