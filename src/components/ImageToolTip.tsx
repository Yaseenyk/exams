const TAG = "utm_source=exams&utm_medium=cross-site&utm_campaign=photo-size";

/**
 * A pointer from the application steps to our own image tools, where the overlap is real: every exam form rejects a photograph
 * or signature that is over its size limit. It says plainly that the tool is ours. The links carry a tag so the dashboard can
 * count how many readers cross over (Sources tab: medium "cross-site").
 */
export default function ImageToolTip() {
  return (
    <aside className="mt-6 rounded-xl border border-cyan/40 bg-cyan/5 p-4 text-sm leading-relaxed text-zinc-200">
      <p className="!mt-0">
        <strong className="text-zinc-50">Photo or signature over the size limit?</strong> The limits in the table above are strict. A free tool we run ourselves can shrink a picture to a size such as 20, 50 or 100 KB in your browser, and nothing is uploaded.
      </p>
      <p className="!mt-2">
        <a href={`https://images.streamerosai.com/compress-image-to-100kb/?${TAG}`}>Compress an image to a set size</a>
        {" · "}
        <a href={`https://images.streamerosai.com/guides/image-size-limits-on-forms/?${TAG}`}>Why uploads get rejected, and how to fix it</a>
      </p>
      <p className="!mt-2 text-xs text-zinc-500">This is our own tool, not an NTA, UPSC or government service.</p>
    </aside>
  );
}
