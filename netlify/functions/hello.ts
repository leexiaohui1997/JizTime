import type { Context } from "@netlify/functions";
import { formatGreeting } from "@shared/utils";
import { getSecretKey, performSensitiveTask } from "@server/secret-helper";

export default async (req: Request, context: Context) => {
  // 从 URL 查询参数中获取 name，默认为 "World"
  const url = new URL(req.url);
  const name = url.searchParams.get("name") || "World";

  // 使用共享逻辑生成问候语
  const message = formatGreeting(name);

  // 使用后端专用逻辑获取密钥
  const secretInfo = getSecretKey();

  // 模拟执行敏感任务
  const taskResult = performSensitiveTask({ user: name, action: "greet" });

  return new Response(JSON.stringify({
    message,
    secretInfo,
    taskResult
  }), {
    headers: {
      "Content-Type": "application/json",
      // 允许跨域，方便小程序调用
      "Access-Control-Allow-Origin": "*",
    },
  });
};
