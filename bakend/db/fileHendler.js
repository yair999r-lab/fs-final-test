import fs from "fs/promises";

const FILE = "users.json";

export async function saveFile(data) {
  try {
    await fs.writeFile("users.json", JSON.stringify(data), "utf-8");
  } catch (error) {
    throw error;
  }
}

export async function loadFile() {
  try {
    const data = await fs.readFile("users.json", "utf-8");
    return await JSON.parse(data);
  } catch (error) {
    console.log(error)
    throw error;
  }
}
