import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // 从 URL 查询参数中获取 name，默认为 "World"
  const url = new URL(req.url);
  const name = url.searchParams.get("name") || "World";

  return new Response(JSON.stringify({ message: `Hello, ${name}!` }), {
    headers: {
      "Content-Type": "application/json",
      // 允许跨域，方便小程序调用
      "Access-Control-Allow-Origin": "*",
    },
  });
};
