// src/lib/peekClient.ts

const BASE_URL = "https://api.peek.com"
// Vite automatically inlines any VITE_* env var under import.meta.env
const API_KEY = (import.meta as any).env.VITE_PEEK_API_KEY as string

if (!API_KEY) {
  throw new Error(
    "Missing Peek API key. Define VITE_PEEK_API_KEY in your .env file."
  )
}

async function request<T>(path: string, body: Record<string, any>): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${API_KEY}`,
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Peek API error (${res.status}): ${text}`)
  }
  return res.json()
}

export default {
  calendar: (productId: string, month: string): Promise<string[]> =>
    request("/availability/calendar", { productId, month }),

  slots: (
    productId: string,
    date: string
  ): Promise<Array<{ slotId: string; time: string; capacity: number }>> =>
    request("/availability", { productId, date }),

  hold: (
    productId: string,
    date: string,
    slotId: string
  ): Promise<{ hold_id: string }> =>
    request("/booking/hold", { productId, date, slotId }),

  book: (
    holdId: string,
    guest: { firstName: string; lastName: string; email: string; phone: string }
  ): Promise<{ payment_url: string; booking_id: string }> =>
    request("/booking", { holdId, ...guest }),

  getBooking: (bookingId: string): Promise<any> =>
    fetch(`${BASE_URL}/booking/${bookingId}`, {
      headers: { Authorization: `Token ${API_KEY}` },
    }).then(res => {
      if (!res.ok) throw new Error(`Peek getBooking error: ${res.statusText}`)
      return res.json()
    }),
}
