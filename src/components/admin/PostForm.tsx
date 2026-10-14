const label = "text-[13px] text-[var(--ink-2)]";
const input =
  "mt-1.5 h-10 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";
const area =
  "mt-1.5 w-full rounded-lg border border-[var(--hairline)] bg-transparent px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

export type PostFormValues = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  author?: string;
  readingMinutes?: number;
  status?: string;
};

export function PostForm({
  action,
  post,
  submitLabel,
}: {
  action: (formData: FormData) => Promise<void>;
  post?: PostFormValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-5">
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}

      <div>
        <label className={label} htmlFor="title">
          Title
        </label>
        <input id="title" name="title" required defaultValue={post?.title} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="slug">
          Slug (optional)
        </label>
        <input id="slug" name="slug" defaultValue={post?.slug} className={input} />
      </div>
      <div>
        <label className={label} htmlFor="excerpt">
          Excerpt
        </label>
        <textarea id="excerpt" name="excerpt" rows={3} defaultValue={post?.excerpt} className={area} />
      </div>
      <div>
        <label className={label} htmlFor="content">
          Content (blank line between paragraphs, **bold** supported)
        </label>
        <textarea
          id="content"
          name="content"
          rows={16}
          defaultValue={post?.content}
          className={area}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="category">
            Category
          </label>
          <input id="category" name="category" defaultValue={post?.category ?? "Guides"} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="author">
            Author
          </label>
          <input id="author" name="author" defaultValue={post?.author ?? "Pokemon Rush"} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="readingMinutes">
            Reading minutes
          </label>
          <input
            id="readingMinutes"
            name="readingMinutes"
            inputMode="numeric"
            defaultValue={String(post?.readingMinutes ?? 5)}
            className={input}
          />
        </div>
        <div>
          <label className={label} htmlFor="status">
            Status
          </label>
          <select id="status" name="status" defaultValue={post?.status ?? "draft"} className={input}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="coverImage">
          Cover image URL
        </label>
        <input id="coverImage" name="coverImage" defaultValue={post?.coverImage} className={input} />
      </div>

      <div className="border-t border-[var(--hairline)] pt-5">
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
