'use client'

import { useActiveChannel } from "../hooks/useActiveChannel";

export const ActiveStatus = () => {
  useActiveChannel();

  return null;
}
