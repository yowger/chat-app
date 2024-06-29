import { randomBytes } from "crypto"

export const generateId = (): string => randomBytes(16).toString("hex")
