import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Database } from "../../../database.types";
import { createClient } from "@supabase/supabase-js";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const service_role = process.env.SUPABASE_SERVICE_ROLE as string;

const reqHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createClient(supabase_url, service_role);
  const supabaseServerClient = createPagesServerClient<Database>({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();
  if (user) {
    const { data, error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) console.error(error);
  }

  res.status(200).json({ message: "Ok" });
};

export default reqHandler;
