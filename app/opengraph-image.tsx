import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'The Capital Cove — Fix & Flip Loans, Close in 5 Days';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #1B2B4B 0%, #0F1A2E 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#D4A853',
            }}
          />
          THE CAPITAL COVE
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: 900,
            }}
          >
            Close Your Next Deal in 5 Days
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#D1CEC9',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Fix &amp; flip funding from 9%. Up to 75% ARV, 100% rehab financing.
            No income verification. 47 states.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          {['5-Day Closings', '100% Rehab Funded', 'Rates from 9%', '47 States'].map(
            (pill) => (
              <div
                key={pill}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 999,
                  fontSize: 20,
                  fontWeight: 500,
                  display: 'flex',
                }}
              >
                {pill}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
