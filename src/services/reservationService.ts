export interface ReservationData {
  name: string;
  phone: string;
  email?: string;
  guests: string;
  vibe: string;
  date: string;
  time: string;
}

export interface ReservationResponse {
  success: boolean;
  message?: string;
  error?: string;
  id?: string;
}

export async function submitReservation(data: ReservationData): Promise<ReservationResponse> {
  // Always persist locally first so booking is never lost
  try {
    const existing = JSON.parse(localStorage.getItem('ciroco_bookings') || '[]');
    existing.push({
      ...data,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('ciroco_bookings', JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }

  // Primary endpoint (works with Vite Dev Server Middleware & Vercel Serverless Function)
  let endpoint = '/api/send-reservation';

  try {
    let response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Fallback if deployed on PHP-only Apache / Hostinger environment
    if (response.status === 404) {
      endpoint = '/api/send-reservation.php';
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: result?.error || result?.message || `Server responded with status ${response.status}`,
      };
    }

    return {
      success: true,
      message: 'Reservation notification email sent successfully',
      id: result?.id,
    };
  } catch (err: any) {
    console.error('Reservation API dispatch failed:', err);
    // Even if email dispatch has a connection glitch, return soft status
    return {
      success: false,
      error: err?.message || 'Network error while notifying restaurant',
    };
  }
}
