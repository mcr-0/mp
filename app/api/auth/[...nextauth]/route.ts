import NextAuth from "next-auth";
import { authOptions } from "../authConfig/route"; // Import z pliku authConfig.ts

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
