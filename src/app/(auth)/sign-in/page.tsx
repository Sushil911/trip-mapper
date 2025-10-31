import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { SignInView } from "@/components/sign-in-view";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // if(!!session){
  //     redirect("/home")
  // }
  return <SignInView />;
};

export default Page;
