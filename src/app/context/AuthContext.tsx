'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = ({children}:AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>
}
