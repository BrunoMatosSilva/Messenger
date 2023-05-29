import { ReactNode } from "react"
import { DesktopSidebar } from "./DesktopSidebar"
import { MoobileFooter } from "./MoobileFooter"
import { getCurrentUser } from "@/app/actions/getCurrentUser"

export const Sidebar = async({ children }:{ children: ReactNode }) => {
  const currentUser = await getCurrentUser();

  return(
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MoobileFooter />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}
