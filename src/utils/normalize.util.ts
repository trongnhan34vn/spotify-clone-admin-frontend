export const normalizeDefaultValues = (data: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value ?? ''])
  );
