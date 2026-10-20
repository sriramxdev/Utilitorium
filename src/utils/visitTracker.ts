export const VISITS_STORAGE_KEY = 'utilitorium-visits';

export function getVisitCount(toolId: string, seed = 0): number {
	if (typeof localStorage === 'undefined') return seed;
	const visits = JSON.parse(localStorage.getItem(VISITS_STORAGE_KEY) ?? '{}') as Record<string, number>;
	return seed + (visits[toolId] ?? 0);
}

export function recordVisit(toolId: string): void {
	if (typeof localStorage === 'undefined') return;
	const visits = JSON.parse(localStorage.getItem(VISITS_STORAGE_KEY) ?? '{}') as Record<string, number>;
	visits[toolId] = (visits[toolId] ?? 0) + 1;
	localStorage.setItem(VISITS_STORAGE_KEY, JSON.stringify(visits));
}
