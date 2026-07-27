import path from "path";
import sharp from "sharp";

export type SizedImage = {
  src: string;
  width?: number;
  height?: number;
};

// Reads the intrinsic dimensions of an image under /public so galleries can
// render natural aspect ratios with reserved space (CLS = 0). Videos and
// unreadable files fall back to dimension-less entries.
export async function withImageSizes(srcs: string[]): Promise<SizedImage[]> {
  return Promise.all(
    srcs.map(async (src) => {
      if (/\.(mp4|webm)$/i.test(src)) return { src };
      try {
        const { width, height, orientation } = await sharp(
          path.join(process.cwd(), "public", src),
        ).metadata();
        if (!width || !height) return { src };
        // EXIF orientations 5-8 are rotated 90°; swap the reported box.
        const rotated = typeof orientation === "number" && orientation >= 5;
        return rotated
          ? { src, width: height, height: width }
          : { src, width, height };
      } catch {
        return { src };
      }
    }),
  );
}
