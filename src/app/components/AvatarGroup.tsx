'use client'

import { User } from "@prisma/client"
import Image from "next/image"

interface AvatarGroupProps {
users: User[]
}

export const AvatarGroup = ({ users = [] }: AvatarGroupProps) => {
  const slicedUser = users.slice(0, 3)

  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0',
  }

  return(
    <div className="relative h-11 w-11">
      {slicedUser.map((user, index) => (
        <div key={user.id}
        className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px]
         ${positionMap[index as keyof typeof positionMap]}`}
        >
          <Image
            alt="Avatar"
            fill
            src={user?.image || '/images/placeholder.jpg'}
          />
        </div>
      ))}
      <span
        className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3"
        />
    </div>
  )
}
