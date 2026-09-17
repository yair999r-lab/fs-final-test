import { USERS } from "../app.js"  


export async function addNewUser(username, password, email) {
    const id = USERS.length + 1
    USERS.push({username, password, email, id})
    return id
}

export function findUserPassword(email){
    const user = USERS.find(u => u.email === email)
    if(!user){
        const err = new Error("user not exists")
        err.status = 400
        throw(err)
    }

    return user
}