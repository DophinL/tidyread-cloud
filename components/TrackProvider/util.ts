import { JsonType, posthog } from 'posthog-js';
import { useCallback, useEffect, useState } from 'react';

import { convertObject } from '@/utils/object';

import { GLOBAL_DISABLED } from './global';


const defaultOptions = {
  sendInstantly: false,
};

function useForceRender() {
  const [, setTick] = useState(0);

  const forceRender = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);

  return forceRender;
}

/**
 * 埋点
 */
export function track(
  eventName: string,
  data?: Record<string, any>,
  options?: { sendInstantly?: boolean },
) {
  if (GLOBAL_DISABLED) return;
  const mergedOptions = { ...defaultOptions, ...options };
  try {
    posthog.capture(eventName, convertObject(data), {
      send_instantly: mergedOptions?.sendInstantly,
    });
  } catch (err) {
    console.error('posthog track error:', err);
  }
}

/**
 * 初始化用户信息
 * @param user
 */
export function initUser(user: { id: string | number; [k: string]: any }) {
  const { id, ...otherProps } = user;
  if (GLOBAL_DISABLED) return;
  try {
    posthog.identify(`${id}`, otherProps);
  } catch (err) {
    console.error('posthog initUser error:', err);
  }

  Promise.resolve().then(() => {
    // 每次reload，onFeatureFlags都会重新触发
    posthog.reloadFeatureFlags();
  });
}

/**
 * 设置分组信息（如tenant）
 */
export function setGroup(
  groupName: string,
  groupId: string,
  properties: Record<string, any>,
) {
  if (GLOBAL_DISABLED) return;
  try {
    posthog.group(groupName, groupId, properties);
  } catch (err) {
    console.error('posthog setGroup error:', err);
  }
}

/**
 * feature flag是否开启
 * @param featureName
 * @returns
 */
export function isFeatureEnabled(featureName: string): boolean {
  if (GLOBAL_DISABLED) return true;
  // 考虑兼容next.js服务端渲染，否则会报错
  try {
    // 服务端渲染的时候默认没有
    return typeof window === 'undefined'
      ? false
      : posthog.isFeatureEnabled(featureName) ?? false;
  } catch (err) {
    console.error('posthog isFeatureEnabled error:', err);
    // 出错默认认为有该feature
    return true;
  }
}

/**
 * feature flag是否开启
 * @param featureName
 * @returns
 */
export function useFeatureEnabled(featureName: string) {
  const forceRender = useForceRender();

  useEffect(() => {
    if (GLOBAL_DISABLED) return;
    const off = posthog.onFeatureFlags(() => {
      forceRender();
    });

    return () => {
      off?.();
    };
  }, [forceRender]);

  return isFeatureEnabled(featureName);
}

/**
 * 获取feature flag的payload
 * @param key
 * @returns
 */
export function getFeatureFlagPayload(key: string): JsonType {
  if (GLOBAL_DISABLED) return null;
  try {
    return posthog.getFeatureFlagPayload(key);
  } catch (err) {
    return null;
  }
}

/**
 * 刷新featureFlags
 * @returns
 */
export function reloadFeatureFlags() {
  if (GLOBAL_DISABLED) return;
  posthog.reloadFeatureFlags();
}
