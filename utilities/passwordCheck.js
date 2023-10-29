export function checkUserPassword(password, passwordHash) {
    console.log(`password: ${password}, passwordHash: ${passwordHash}`)
    // använd bcrypt or password / dylikt
    if (password === passwordHash) {
        return true
    }
    return false
}