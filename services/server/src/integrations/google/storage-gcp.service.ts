import { Injectable } from "@nestjs/common";
import { Storage } from "@google-cloud/storage";

@Injectable()
export class StorageGcpService {
  private readonly storage = new Storage();

  public async listFiles(opts: { bucket: string }): Promise<Array<{ name: string; delete: () => Promise<void> }>> {
    const [files] = await this.storage.bucket(opts.bucket).getFiles();
    return files.map(file => ({
      name: file.name,
      delete: async () => {
        await file.delete();
      },
    }));
  }

  public getObject(opts: { bucket: string; objectName: string }) {
    return this.storage.bucket(opts.bucket).file(opts.objectName);
  }

  public async putObject(opts: {
    bucket: string;
    content: Buffer;
    contentType: string;
    destination?: string;
  }): Promise<string> {
    const name = opts.destination || `upload-${Date.now()}.pdf`;
    const file = this.storage.bucket(opts.bucket).file(name);
    await file.save(opts.content, {
      contentType: opts.contentType,
      metadata: { contentType: opts.contentType },
    });
    return `https://storage.googleapis.com/${opts.bucket}/${name}`;
  }
}
