import { SetMetadata } from "@nestjs/common";

export const PUBLIC_KEY = "public";

export const Public = (): ReturnType<typeof SetMetadata> => SetMetadata(PUBLIC_KEY, true);
