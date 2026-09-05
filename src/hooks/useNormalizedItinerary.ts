import { useMemo } from 'react';
import type { ItineraryDay } from '../types/project';
import type { NormalizedItineraryDay } from '../types/hooks';

interface UseNormalizedItineraryOptions {
  /** Cap the number of days returned (short templates show a subset). */
  limit?: number;
}

/**
 * Single source of truth for itinerary-day display rules, shared across
 * every template. Each template previously re-derived day numbering, image
 * fallback, and metrics presence itself, and the three had already drifted
 * (different fallback operators, inconsistent zero-padding).
 */
export const useNormalizedItinerary = (
  itinerary: ItineraryDay[] | undefined,
  options?: UseNormalizedItineraryOptions
): NormalizedItineraryDay[] => {
  const limit = options?.limit;

  return useMemo(() => {
    const days = itinerary ?? [];
    const limited = limit !== undefined ? days.slice(0, limit) : days;

    return limited.map((day, index) => {
      const images = day.images?.length ? day.images : day.image ? [day.image] : [];

      return {
        ...day,
        index,
        dayLabel: String(day.day || index + 1).padStart(2, '0'),
        images,
        hasImages: images.length > 0,
        hasMetrics: Boolean(day.distance || day.time),
      };
    });
  }, [itinerary, limit]);
};
