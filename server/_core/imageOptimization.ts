import sharp from "sharp";

export interface OptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSizeKB?: number;
}

const DEFAULT_OPTIONS: OptimizationOptions = {
  maxWidth: 800,
  maxHeight: 800,
  quality: 80,
  maxSizeKB: 500,
};

/**
 * Otimiza uma imagem redimensionando e comprimindo
 * @param buffer Buffer da imagem original
 * @param mimeType Tipo MIME da imagem (image/jpeg, image/png, etc)
 * @param options Opções de otimização
 * @returns Buffer otimizado e informações da imagem
 */
export async function optimizeImage(
  buffer: Buffer,
  mimeType: string,
  options: OptimizationOptions = {}
) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  try {
    let pipeline = sharp(buffer);

    // Obter metadados da imagem original
    const metadata = await pipeline.metadata();
    console.log(`[Image Optimization] Original: ${buffer.length} bytes, ${metadata.width}x${metadata.height}px`);

    // Redimensionar se necessário
    if (metadata.width && metadata.height) {
      if (metadata.width > opts.maxWidth! || metadata.height > opts.maxHeight!) {
        pipeline = pipeline.resize(opts.maxWidth, opts.maxHeight, {
          fit: "inside",
          withoutEnlargement: true,
        });
      }
    }

    // Comprimir baseado no tipo de imagem
    let optimizedBuffer: Buffer;

    if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
      optimizedBuffer = await pipeline
        .jpeg({ quality: opts.quality, progressive: true })
        .toBuffer();
    } else if (mimeType === "image/png") {
      optimizedBuffer = await pipeline
        .png({ quality: opts.quality, compressionLevel: 9 })
        .toBuffer();
    } else if (mimeType === "image/webp") {
      optimizedBuffer = await pipeline
        .webp({ quality: opts.quality })
        .toBuffer();
    } else {
      // Para outros tipos, converter para JPEG
      optimizedBuffer = await pipeline
        .jpeg({ quality: opts.quality, progressive: true })
        .toBuffer();
    }

    // Validar tamanho final
    const sizeKB = optimizedBuffer.length / 1024;
    if (sizeKB > opts.maxSizeKB!) {
      console.warn(
        `[Image Optimization] Tamanho final (${sizeKB.toFixed(2)}KB) excede limite (${opts.maxSizeKB}KB). Reduzindo qualidade...`
      );

      // Tentar novamente com qualidade reduzida
      const reducedQuality = Math.max(30, opts.quality! - 20);
      pipeline = sharp(buffer);

      if (metadata.width && metadata.height) {
        if (metadata.width > opts.maxWidth! || metadata.height > opts.maxHeight!) {
          pipeline = pipeline.resize(opts.maxWidth, opts.maxHeight, {
            fit: "inside",
            withoutEnlargement: true,
          });
        }
      }

      if (mimeType === "image/jpeg" || mimeType === "image/jpg") {
        optimizedBuffer = await pipeline
          .jpeg({ quality: reducedQuality, progressive: true })
          .toBuffer();
      } else if (mimeType === "image/png") {
        optimizedBuffer = await pipeline
          .png({ quality: reducedQuality, compressionLevel: 9 })
          .toBuffer();
      } else {
        optimizedBuffer = await pipeline
          .jpeg({ quality: reducedQuality, progressive: true })
          .toBuffer();
      }
    }

    const finalMetadata = await sharp(optimizedBuffer).metadata();
    const finalSizeKB = optimizedBuffer.length / 1024;
    const reduction = ((1 - optimizedBuffer.length / buffer.length) * 100).toFixed(1);

    console.log(
      `[Image Optimization] Otimizado: ${optimizedBuffer.length} bytes (${finalSizeKB.toFixed(2)}KB), ${finalMetadata.width}x${finalMetadata.height}px, redução ${reduction}%`
    );

    return {
      buffer: optimizedBuffer,
      width: finalMetadata.width,
      height: finalMetadata.height,
      sizeKB: finalSizeKB,
      reduction: parseFloat(reduction),
    };
  } catch (error) {
    console.error("[Image Optimization] Erro ao otimizar imagem:", error);
    throw new Error(`Erro ao otimizar imagem: ${error instanceof Error ? error.message : String(error)}`);
  }
}
