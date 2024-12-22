import * as React from 'react';

type WelcomeEmailProps = {
  email: string;
};

export const WelcomeEmail = ({ email }: Readonly<WelcomeEmailProps>) => (
  <div
    style={{
      backgroundColor: '#0f172a',
      padding: '48px 0',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}
  >
    <div
      style={{
        background: '#1e293b',
        borderRadius: '12px',
        padding: '40px',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        color: '#f8fafc',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#f8fafc',
          }}
        >
          Welcome to Lyra! 🎮
        </h1>
        <p
          style={{
            fontSize: '20px',
            color: '#94a3b8',
            lineHeight: '1.5',
            marginBottom: '24px',
          }}
        >
          Join Our Growing Community!
        </p>
      </div>

      <div
        style={{
          backgroundColor: '#2d3748',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '32px',
        }}
      >
        <p
          style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}
        >
          We're excited to have you join us as we prepare to launch Lyra - a
          new platform for watching YouTube channels with friends around the
          world. While we're putting the finishing touches on the platform, we'd
          love for you to join our community!
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#94a3b8' }}>
          Your email <strong style={{ color: '#f8fafc' }}>{email}</strong> is
          registered and you'll be among the first to know when we launch.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <a
          href="https://discord.gg/6Hjumj65"
          style={{
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '16px',
          }}
        >
          Join Our Discord →
        </a>
      </div>

      <div
        style={{
          borderTop: '1px solid #334155',
          paddingTop: '24px',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <a
            href="https://Lyra.vercel.app/changelog"
            style={{
              color: '#94a3b8',
              textDecoration: 'none',
              marginRight: '16px',
            }}
          >
            <img
              src="https://cdn.simpleicons.org/clockify/94A3B8"
              alt="Changelog"
              width="20"
              height="20"
              style={{ display: 'inline', verticalAlign: 'middle' }}
            />
          </a>
          <a
            href="https://discord.gg/6Hjumj65"
            style={{
              color: '#94a3b8',
              textDecoration: 'none',
            }}
          >
            <img
              src="https://cdn.simpleicons.org/discord/94A3B8"
              alt="Discord"
              width="20"
              height="20"
              style={{ display: 'inline', verticalAlign: 'middle' }}
            />
          </a>
        </div>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          {new Date().getFullYear()} Lyra. All rights reserved.
        </p>
      </div>
    </div>
  </div>
);
