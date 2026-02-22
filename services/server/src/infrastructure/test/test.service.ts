import { Injectable } from "@nestjs/common";

@Injectable()
export class TestService {
  public test(dto: any): Promise<boolean> {
    console.info("dto", dto);
    return Promise.resolve(true);
  }
}
