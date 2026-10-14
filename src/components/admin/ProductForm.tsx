import { ImageUploader } from "@/components/admin/ImageUploader";

const label = "text-[13px] text-[var(--ink-2)]";
const input =
  "mt-1.5 h-10 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";
const area =
  "mt-1.5 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

export type ProductFormValues = {
  id?: string;
  name?: string;
  slug?: string;
  subtitle?: string;
  brand?: string;
  language?: string;
  productType?: string;
  setName?: string;
  price?: number;
  compareAtPrice?: number | null;
  currency?: string;
  condition?: string;
  status?: string;
  featured?: boolean;
  tags?: string[];
  description?: string;
  highlights?: string[];
  specs?: Record<string, string>;
  images?: { url: string }[];
};

export function ProductForm({
  action,
  product = {},
  submitLabel = "Save product",
}: {
  action: (formData: FormData) => Promise<void>;
  product?: ProductFormValues;
  submitLabel?: string;
}) {
  const specsText = Object.entries(product.specs ?? {})
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  const dollars = (cents?: number | null) =>
    cents == null ? "" : (cents / 100).toFixed(2);

  return (
    <form action={action} className="max-w-3xl space-y-10">
      {product.id ? <input type="hidden" name="id" value={product.id} /> : null}

      <section className="space-y-4">
        <div>
          <label className={label} htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required defaultValue={product.name} className={input} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="slug">
              Slug (optional)
            </label>
            <input id="slug" name="slug" defaultValue={product.slug} className={input} />
          </div>
          <div>
            <label className={label} htmlFor="setName">
              Set name
            </label>
            <input id="setName" name="setName" defaultValue={product.setName} className={input} />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="subtitle">
            Subtitle
          </label>
          <input id="subtitle" name="subtitle" defaultValue={product.subtitle} className={input} />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="brand">
            Brand
          </label>
          <select id="brand" name="brand" defaultValue={product.brand ?? "pokemon"} className={input}>
            <option value="pokemon">Pokémon</option>
            <option value="one-piece">One Piece</option>
            <option value="weiss-schwarz">Weiss Schwarz</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="language">
            Language
          </label>
          <select
            id="language"
            name="language"
            defaultValue={product.language ?? "english"}
            className={input}
          >
            <option value="english">English</option>
            <option value="japanese">Japanese</option>
            <option value="chinese">Chinese</option>
            <option value="korean">Korean</option>
            <option value="n/a">N/A</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="productType">
            Product type
          </label>
          <select
            id="productType"
            name="productType"
            defaultValue={product.productType ?? "booster-box"}
            className={input}
          >
            <option value="booster-box">Booster box</option>
            <option value="booster-bundle">Booster bundle</option>
            <option value="elite-trainer-box">Elite Trainer Box</option>
            <option value="sealed-case">Sealed case</option>
            <option value="booster-pack">Booster pack</option>
            <option value="collection">Premium collection</option>
            <option value="trial-deck">Trial deck</option>
            <option value="single-card">Single card</option>
            <option value="graded-card">Graded card</option>
            <option value="accessory">Accessory</option>
          </select>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="price">
            Price (USD)
          </label>
          <input
            id="price"
            name="price"
            inputMode="decimal"
            defaultValue={dollars(product.price)}
            className={input}
          />
        </div>
        <div>
          <label className={label} htmlFor="compareAtPrice">
            Compare at (optional)
          </label>
          <input
            id="compareAtPrice"
            name="compareAtPrice"
            inputMode="decimal"
            defaultValue={dollars(product.compareAtPrice ?? null)}
            className={input}
          />
        </div>
        <div>
          <label className={label} htmlFor="currency">
            Currency
          </label>
          <select id="currency" name="currency" defaultValue={product.currency ?? "USD"} className={input}>
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="condition">
            Condition
          </label>
          <select
            id="condition"
            name="condition"
            defaultValue={product.condition ?? "new-sealed"}
            className={input}
          >
            <option value="new-sealed">New, sealed</option>
            <option value="new">New</option>
            <option value="graded">Graded</option>
            <option value="used">Used</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="status">
            Status
          </label>
          <select id="status" name="status" defaultValue={product.status ?? "draft"} className={input}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </section>

      <section>
        <label className={label} htmlFor="tags">
          Tags (comma separated)
        </label>
        <input id="tags" name="tags" defaultValue={product.tags?.join(", ")} className={input} />
      </section>

      <section>
        <label className={label} htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={10}
          defaultValue={product.description}
          className={area}
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="highlights">
            Highlights (one per line)
          </label>
          <textarea
            id="highlights"
            name="highlights"
            rows={5}
            defaultValue={product.highlights?.join("\n")}
            className={area}
          />
        </div>
        <div>
          <label className={label} htmlFor="specs">
            Specs (one per line, e.g. Language: Japanese)
          </label>
          <textarea id="specs" name="specs" rows={5} defaultValue={specsText} className={area} />
        </div>
      </section>

      <section>
        <p className={label}>Images</p>
        <div className="mt-2">
          <ImageUploader initial={product.images?.map((i) => i.url) ?? []} />
        </div>
      </section>

      <section className="flex items-center gap-3">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          defaultChecked={product.featured}
          className="h-4 w-4 accent-[var(--accent)]"
        />
        <label htmlFor="featured" className="text-[14px]">
          Feature on the homepage
        </label>
      </section>

      <div className="flex items-center gap-4 border-t border-[var(--hairline)] pt-6">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-7 text-[15px] font-medium text-white transition-transform duration-150 ease-out active:scale-[0.98]"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
