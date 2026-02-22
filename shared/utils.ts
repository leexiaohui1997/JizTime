// 这是一个纯逻辑工具函数，无副作用，无平台依赖
export const formatGreeting = (name: string): string => {
  return `Greetings, ${name}! This message is from shared logic.`;
};

// 也可以定义共享类型
export interface GreetingResponse {
  message: string;
  timestamp: number;
}
