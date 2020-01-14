import Vue from 'vue';

declare global {
  namespace alt {
    function on(eventName: string, listener: (...args: any[]) => void): void;
    function off(eventName: string, listener: (...args: any[]) => void): void;
    function emit(eventName: string, ...args: any[]): void;
  }
}
