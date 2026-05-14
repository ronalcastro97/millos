import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

export const { auth: default_ } = NextAuth(authConfig);
export default default_;

export const config = {
  matcher: ["/admin/:path*"],
};
