import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function logFrontendError(error: Error, context?: Record<string, unknown>) {
  try {
    const errorData = {
      message: error.message,
      stack: error.stack,
      context
    };

    await fetch('/api/log-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorData)
    });
  } catch (err) {
    console.error('Failed to log error:', err);
  }
}
