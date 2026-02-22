import { Handler } from '@netlify/functions';
import { fetchAlmanac } from '../common/shumai-api';

const handler: Handler = async (event) => {
  try {
    const { ymd } = event.queryStringParameters || {};

    // 调用封装的 API 逻辑
    const data = await fetchAlmanac(ymd);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Almanac function error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

export { handler };
