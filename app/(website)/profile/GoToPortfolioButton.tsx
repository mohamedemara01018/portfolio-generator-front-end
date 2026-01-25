'use client'

import React from 'react'
import { RedirectType, useRouter } from 'next/navigation'

type Props = {
  className?: string
  templateId?: string
  children?: React.ReactNode
}

function GoToPortfolioButton({ className, templateId, children }: Props) {
  const router = useRouter()
  const fallbackId = process.env.NEXT_PUBLIC_DEFAULT_TEMPLATE_ID || '1'
  const id = templateId || fallbackId

  const handleClick = () => {
    router.push(`/portfolio`)
  }

  return (
    <button onClick={handleClick} className={className}>
      {children ?? 'View Portfolio'}
    </button>
  )
}

export default GoToPortfolioButton
