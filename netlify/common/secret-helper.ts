// 这是一个模拟的后端专用工具
// 这里可以包含数据库连接、密钥处理等敏感逻辑
// 前端无法直接引用此模块，因为我们不会在 Taro 配置中为它添加别名

export const getSecretKey = (): string => {
  // 模拟从环境变量获取密钥
  const secret = process.env.INTERNAL_API_KEY || "default-secret-key-12345";
  return `[SERVER-ONLY] Secret: ${secret.substring(0, 4)}***`;
};

export const performSensitiveTask = (data: any) => {
  console.log("正在执行敏感任务:", data);
  return { status: "success", processingTime: Date.now() };
};
