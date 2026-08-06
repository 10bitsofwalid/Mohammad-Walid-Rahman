export interface SystemHealthData {
  status: 'ok' | 'degraded' | 'error';
  environment: string;
  timestamp: string;
  uptimeSeconds: number;
  database: {
    status: string;
    connected: boolean;
  };
  memory: {
    rssMB: number;
    heapMB: number;
  };
  latencyMs?: number;
}

export const healthService = {
  getHealth: async (): Promise<SystemHealthData> => {
    const startTime = performance.now();
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const healthUrl = baseUrl
        ? baseUrl.replace(/\/api\/v1\/?$/, '/health')
        : '/health';
      const response = await fetch(healthUrl);
      const endTime = performance.now();
      const latencyMs = Math.round(endTime - startTime);

      if (!response.ok) {
        return {
          status: 'degraded',
          environment: 'production',
          timestamp: new Date().toISOString(),
          uptimeSeconds: 0,
          database: { status: 'disconnected', connected: false },
          memory: { rssMB: 0, heapMB: 0 },
          latencyMs,
        };
      }

      const data = await response.json();
      return {
        ...data,
        latencyMs,
      };
    } catch {
      return {
        status: 'error',
        environment: 'production',
        timestamp: new Date().toISOString(),
        uptimeSeconds: 0,
        database: { status: 'offline', connected: false },
        memory: { rssMB: 0, heapMB: 0 },
        latencyMs: 0,
      };
    }
  },
};
