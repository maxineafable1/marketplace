'use client'

import { RefObject, useEffect } from 'react'

type EventType =
  | 'mousedown'
  | 'mouseup'
  | 'touchstart'
  | 'touchend'
  | 'focusin'
  | 'focusout'

export function useOnClickOutside<K, T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | HTMLButtonElement> | RefObject<T | HTMLButtonElement>[],
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  dependency: K | K[],
  eventType: EventType = 'mousedown',
): void {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent | FocusEvent) {
      const target = e.target as Node
      
      // Do nothing if the target is not connected element with document
      if (!target || !target.isConnected) {
        return
      }

      const isOutside = Array.isArray(ref)
        ? ref
          .filter(r => Boolean(r.current))
          .every(r => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target)

      if (isOutside)
        handler(e)
    }

    document.addEventListener(eventType, handleClickOutside)
    return () => document.removeEventListener(eventType, handleClickOutside)
  }, [Array.isArray(dependency) ? [...dependency] : dependency])
}