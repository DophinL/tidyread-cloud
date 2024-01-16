/**
 * 把包含bigint的对象转为普通对象，以便JSON.parse能正常解析，否则会报错
 * @param obj
 * @returns
 */
export function convertObject(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'bigint') {
    return obj.toString();
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertObject(item));
  }

  if (typeof obj === 'object') {
    const result: any = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = convertObject(obj[key]);
      }
    }

    return result;
  }

  return obj;
}