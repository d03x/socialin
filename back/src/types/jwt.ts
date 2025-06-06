export type JwtUser = {
    name: string,
    email: string,
}
export type JwtPayload = {
    user: JwtUser,
    sub: string,
}