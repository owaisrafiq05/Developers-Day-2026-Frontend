declare module "sonner" {
  export function toast(message: string, options?: unknown): void;

  export namespace toast {
    function success(message: string, options?: unknown): void;
    function error(message: string, options?: unknown): void;
    function warning(message: string, options?: unknown): void;
    function info(message: string, options?: unknown): void;
  }
}

