import path from "path";
import sharp from "sharp";

export type SizedImage = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  caption?: string;
  credit?: string;
};

export type ImageInput =
  | string
  | {
      src: string;
      alt?: string;
      caption?: string;
      credit?: string;
    };

// Reads the intrinsic dimensions of an image under /public so galleries can
// render natural aspect ratios with reserved space (CLS = 0). Videos and
// unreadable files fall back to dimension-less entries.
export async function withImageSizes(srcs: ImageInput[]): Promise<SizedImage[]> {
  return Promise.all(
    srcs.map(async (input) => {
      const image = typeof input === "string" ? { src: input } : input;
      const { src } = image;
      if (/\.(mp4|webm)$/i.test(src)) return image;
      try {
        const { width, height, orientation } = await sharp(
          path.join(process.cwd(), "public", src),
        ).metadata();
        if (!width || !height) return image;
        // EXIF orientations 5-8 are rotated 90°; swap the reported box.
        const rotated = typeof orientation === "number" && orientation >= 5;
        return rotated
          ? { ...image, width: height, height: width }
          : { ...image, width, height };
      } catch {
        return image;
      }
    }),
  );
}
