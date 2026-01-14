import { describe, it, expect, vi, beforeEach } from 'vitest';
import { rateLimit } from '@/lib/rateLimit';
import { NextRequest, NextResponse } from 'next/server';

describe('Rate Limit Middleware', () => {
  let mockHandler: any;
  let req: NextRequest;

  beforeEach(() => {
    mockHandler = vi.fn().mockImplementation(() => NextResponse.json({ success: true }));
    req = new NextRequest(new URL('http://localhost:3000/api/test'));
    // Mock headers
    Object.defineProperty(req, 'headers', {
      value: new Headers({
        'x-forwarded-for': '127.0.0.1'
      })
    });
  });

  it('should allow requests within limit', async () => {
    const limiter = rateLimit(mockHandler, {
      windowMs: 1000,
      maxRequests: 2,
      identifier: async () => 'test-ip'
    });

    await limiter(req);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    
    await limiter(req);
    expect(mockHandler).toHaveBeenCalledTimes(2);
  });

  it('should block requests exceeding limit', async () => {
    const limiter = rateLimit(mockHandler, {
      windowMs: 1000,
      maxRequests: 1,
      identifier: async () => 'test-ip-blocked'
    });

    // First request - Success
    const res1 = await limiter(req);
    expect(mockHandler).toHaveBeenCalledTimes(1);
    
    // Second request - Blocked
    const res2 = await limiter(req);
    expect(res2.status).toBe(429);
    expect(await res2.json()).toMatchObject({
      success: false
    });
    // Handler should not be called again
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
