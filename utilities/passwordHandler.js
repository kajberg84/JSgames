import bcrypt from 'bcrypt'

export function hashPassword(userPassword) {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(userPassword, salt)
    return hash
}

export function checkUserPassword(password, passwordHash) {
    console.log(`password: ${password}, passwordHash: ${passwordHash}`)
    /* if (password === passwordHash) {
        return true
    }
    return false */
    // använd bcrypt or password / dylikt
    return bcrypt.compareSync(password, passwordHash)
}