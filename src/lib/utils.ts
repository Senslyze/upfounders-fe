export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Comparison management utilities
export const COMPARISON_LIMIT = 3;

export function getComparisonIds(): string[] {
  try {
    const raw = sessionStorage.getItem('compare.selectedIds');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const ids = Array.isArray(parsed) ? parsed : [];
    return ids.slice(0, COMPARISON_LIMIT); // Enforce limit
  } catch {
    return [];
  }
}

export function setComparisonIds(ids: string[]): void {
  try {
    const limitedIds = ids.slice(0, COMPARISON_LIMIT);
    sessionStorage.setItem('compare.selectedIds', JSON.stringify(limitedIds));
  } catch {
    // Ignore errors
  }
}

export function addToComparison(partnerId: string): boolean {
  const currentIds = getComparisonIds();
  if (currentIds.includes(partnerId)) {
    return false; // Already selected
  }
  if (currentIds.length >= COMPARISON_LIMIT) {
    return false; // Limit reached
  }
  setComparisonIds([...currentIds, partnerId]);
  return true;
}

export function removeFromComparison(partnerId: string): boolean {
  const currentIds = getComparisonIds();
  if (!currentIds.includes(partnerId)) {
    return false; // Not selected
  }
  setComparisonIds(currentIds.filter(id => id !== partnerId));
  return true;
}

export function clearComparison(): void {
  try {
    sessionStorage.removeItem('compare.selectedIds');
  } catch {
    // Ignore errors
  }
}
