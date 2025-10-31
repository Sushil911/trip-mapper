import { auth } from "@/lib/auth";
import { SignUpView } from "@/components/sign-up-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // if(!!session){
  //     redirect("/home")
  // }
  return <SignUpView />;
};

export default page;
