'use client'
import React from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

import '@fontsource-variable/open-sans'

import ReactQueryProvider from './react-query-provider'

const SharedProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ReactQueryProvider>
        {children}
      </ReactQueryProvider>

      <ProgressBar
        height="4px"
        color="#c5a07a"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}

export default SharedProvider
