import bcrypt from 'bcrypt'

export function hashPassword(userPassword) {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(userPassword, salt)
    return hash
}

export function checkUserPassword(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash)
}