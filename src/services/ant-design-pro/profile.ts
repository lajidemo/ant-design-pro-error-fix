// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户个人设置数据 GET /api/profile/settings */
export async function getProfileSettings(options?: { [key: string]: any }) {
  return request<{
    data: API.ProfileSettings;
    success: boolean;
    errorMessage?: string;
  }>('/api/profile/settings', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 保存用户个人设置数据 POST /api/profile/settings */
export async function saveProfileSettings(
  body: API.ProfileSettings,
  options?: { [key: string]: any }
) {
  return request<{
    data: API.ProfileSettings;
    success: boolean;
    message?: string;
    errorMessage?: string;
  }>('/api/profile/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
