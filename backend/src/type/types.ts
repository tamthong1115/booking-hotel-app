export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        code: string;
        details?: unknown;
    };
}
