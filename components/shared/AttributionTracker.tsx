'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

/**
 * Mount-once tracker that captures UTM params, referrer, and landing page
 * on initial visit. Persists to sessionStorage for both lead and apply forms
 * to read at submit time.
 */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
