import { USERS } from "../app.js"  
import { loadFile, saveFile } from "../db/fileHendler.js"


export async function addNewUser(username, password, email) {
    const users = await loadFile()
    const id = users.length + 1

    users.push({username, password, email, id})
    await saveFile(users)
    return id
}

export async function findUserPassword(email){
    const users = await loadFile()
    const user = users.find(u => u.email === email)
    
    console.log(123457)
    return user
}