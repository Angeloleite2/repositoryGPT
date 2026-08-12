/**
 * Centralized configuration for the G2 institutional credit in the footer.
 * The credit is rendered only after ACTIVATION_DATE to keep the footer clean
 * during the initial delivery period. If the date check fails for any reason,
 * the default safe behavior is to hide the credit — the rest of the site is
 * never affected.
 */

// Delivery date for this site: 12 Aug 2026.
// Activation = delivery + 30 days.
export const ACTIVATION_DATE = new Date("2026-09-11T00:00:00-03:00");

export const G2_LINK_URL = "https://www.g2agencia.com.br/";

export function shouldShowG2Credit(): boolean {
  try {
    const now = new Date();
    return now.getTime() >= ACTIVATION_DATE.getTime();
  } catch {
    return false;
  }
}
