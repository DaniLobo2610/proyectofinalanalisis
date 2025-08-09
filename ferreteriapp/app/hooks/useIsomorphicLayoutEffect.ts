"use client"

import { useEffect, useLayoutEffect } from "react"

// Hook para evitar warnings de SSR
export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
