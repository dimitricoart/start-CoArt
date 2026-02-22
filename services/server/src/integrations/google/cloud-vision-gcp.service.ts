import { Injectable } from "@nestjs/common";
import { ImageAnnotatorClient } from "@google-cloud/vision";

@Injectable()
export class CloudVisionGcpService {
  private readonly client = new ImageAnnotatorClient();

  public async validate(imageUrl: string): Promise<boolean> {
    try {
      const [result] = await this.client.safeSearchDetection({
        image: { source: { imageUri: imageUrl } },
      });
      const detection = result?.safeSearchAnnotation;
      if (!detection) return true;
      const adult = detection.adult;
      const violence = detection.violence;
      const racy = detection.racy;
      return adult !== "LIKELY" && adult !== "VERY_LIKELY" && violence !== "LIKELY" && violence !== "VERY_LIKELY" && racy !== "LIKELY" && racy !== "VERY_LIKELY";
    } catch {
      return true;
    }
  }
}
