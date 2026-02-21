// 区分环境和平台导出 API Base URL
// process.env.NODE_ENV: 'development' | 'production'
// process.env.TARO_ENV: 'h5' | 'weapp' | ...

export const getApiBaseUrl = () => {
  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    // H5 开发环境：使用相对路径，配合 config/dev.ts 中的代理转发到本地 Netlify Dev (http://localhost:8888)
    if (process.env.TARO_ENV === 'h5') {
      return '/api';
    }
    // 小程序开发环境：必须使用完整的 URL
    // 注意：本地开发时，如果没有公网域名，需要配置不校验合法域名
    // 这里指向您部署后的线上域名，或者您可以改为本地局域网 IP (如 http://192.168.x.x:8888)
    return 'https://jiztime.netlify.app';
  }

  // 生产环境
  // H5：部署在同一域名下，直接使用空字符串（相对路径）
  if (process.env.TARO_ENV === 'h5') {
    return '';
  }

  // 小程序等其他平台：必须使用完整的生产环境 URL
  return 'https://jiztime.netlify.app';
};

export const API_BASE_URL = getApiBaseUrl();
