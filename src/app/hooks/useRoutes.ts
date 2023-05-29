import { useMemo } from "react";
import { HiChat } from "react-icons/hi"
import { HiArrowLeftOnRectangle, HiUsers } from "react-icons/hi2"
import { signOut } from "next-auth/react";

import { useConversation } from "./useConversation";
import { usePathname } from "next/navigation";

export const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(() => [
    {
      label: 'Chat',
      href: '/conversations',
      icon: HiChat,
      active: pathname === '/conversations' || !!conversationId
    },
    {
      label: 'Contatos',
      href: '/users',
      icon: HiUsers,
      active: pathname === '/users'
    },
    {
      label: 'Sair',
      href: '#',
      onClick: () => signOut(),
      icon: HiArrowLeftOnRectangle
    }
],[pathname, conversationId])

return routes;
}
