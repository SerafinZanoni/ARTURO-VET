export interface PostgresError {
  code: number;
  detail?: string;
}

export interface ErrorResponse {
  message: string;
  details?: string;
  code?: number;
}
