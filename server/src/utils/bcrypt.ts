import bcrypt from "bcrypt"

export const hashPassword = async (password: string): Promise<string> => {
    const SALT_ROUNDS = 10
    const hashedPassword = bcrypt.hash(password, SALT_ROUNDS)

    return hashedPassword
}

export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const isPasswordValid = bcrypt.compare(password, hashedPassword)

    return isPasswordValid
}
