export interface MenuItem {
  label: string;
  link: string;
  icon?: string;
  children?: MenuItem[];
}

// Tabs data structure for session details
export interface TabData {
  label: string;
  icon: string;
  count: number;
  visible: boolean;
  type: string;
  hasError: boolean;
  errorCount: number;
}

export type SessionStatus = 'success' | 'warning' | 'fail' | 'unavailable' | 'in-progress';

export const statuses: SessionStatus[] = [
  'success',
  'warning',
  'fail',
  'unavailable',
  'in-progress',
];

export enum Label {
  SERVER_IDENTITY = "SERVER_IDENTITY",
  OS_RE = "OS_RE",
  IP_PORT = "IP_PORT",
  BRANCH_COMMIT = "BRANCH_COMMIT",
  ELAPSED_LATENSE = "ELAPSED_LATENSE",
  METHOD_RESOURCE = "METHOD_RESOURCE",
  SIZE_COMPRESSION = "SIZE_COMPRESSION",
  PROTOCOL_SCHEME = "PROTOCOL_SCHEME",
  STATUS_EXCEPTION = "STATUS_EXCEPTION",
  USER = "USER"
}

export interface RestSessionTree {
  os: string;
  re: string;
  address: string;
  restRequests?: any[];
  databaseRequests?: any[];
  ftpRequests?: any[];
  mailRequests?: any[];
  ldapRequests?: any[];
}

// Données de démonstration statiques
export const MOCK_TREE_DATA: RestSessionTree = {
  appName: 'api-gateway',
  os: 'Linux',
  re: 'PROD',
  address: '10.0.0.1',
  port: 8080,
  type: 'microservice',
  restRequests: [
    {
      id: 'req-01',
      method: 'GET',
      path: '/api/v1/orders',
      status: 200,
      elapsedTime: 120,
      protocol: 'HTTPS',
      remoteTrace: {
        appName: 'order-service',
        os: 'Linux',
        re: 'PROD',
        address: '10.0.0.2',
        port: 8081,
        type: 'microservice',
        databaseRequests: [
          {
            id: 'db-01',
            type: 'POSTGRESQL',
            address: '10.0.0.10',
            port: 5432,
            count: 3,
            elapsedTime: 15,
            status: 200
          } as any
        ],
        restRequests: [
          {
            id: 'req-02',
            method: 'POST',
            path: '/api/v1/payments/verify',
            status: 200,
            elapsedTime: 45,
            protocol: 'HTTPS',
            remoteTrace: {
              appName: 'payment-service',
              os: 'Linux',
              re: 'PROD',
              address: '10.0.0.3',
              port: 8082,
              type: 'microservice'
            } as any
          } as any
        ]
      } as any
    } as any
  ]
} as any;
