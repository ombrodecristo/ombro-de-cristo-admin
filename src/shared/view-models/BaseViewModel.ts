export abstract class BaseViewModel {
  private listeners: Set<() => void> = new Set();

  public subscribe = (callback: () => void): (() => void) => {
    this.listeners.add(callback);

    return () => this.listeners.delete(callback);
  };

  protected notify = (): void => {
    this.listeners.forEach(cb => cb());
  };
}
