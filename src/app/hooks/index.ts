'use client'
import { useRef, useEffect, useMemo, useCallback, useState, DependencyList } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '../../../utils/supabase/client'

export const useSupabase = (): SupabaseClient => {
    return useMemo(createClient, [])
  }
  