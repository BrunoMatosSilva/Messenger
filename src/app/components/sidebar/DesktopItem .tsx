/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import clsx from "clsx"
import Link from "next/link"

interface DesktopItemProps {
  label: string
  href: string
  icon: any
  active?: boolean
  onClick?: () => void
}

export const DesktopItem = ({ label, href, icon: Icon, active, onClick }:DesktopItemProps) => {

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  }

  return (
    <li onClick={handleClick}>
      <Link
      href={href}
      className={clsx(`
      group flex gap-x-3 rounded-md p-3 text-sm leanding-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100 transition-all
      `,
      active && "bg-gray-100 text-black"
      )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  )
}
