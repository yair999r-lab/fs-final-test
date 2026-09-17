import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"

dotenv.config()

const supabaseUrl = process.env.PORT;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

export const client = createClient(supabaseUrl, supabaseKey)

console.log(client)