export const findMissingKeys = (objA: any, objB: any): string[] => {
  const missingKeys: string[] = [];

  const traverse = (a: any, b: any, path = '') => {
    Object.keys(a).forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      if (!(key in b)) {
        missingKeys.push(currentPath);
      } else if (
        typeof a[key] === 'object' && 
        a[key] !== null &&
        typeof b[key] === 'object' && 
        b[key] !== null
      ) {
        traverse(a[key], b[key], currentPath);
      }
    });
  };

  traverse(objA, objB);
  return missingKeys;
};

export const addMissingKeysWithDefault = (
  content: any,
  missingKeys: string[],
  defaultValue: string = 'NOT-IMPLEMENTED'
): any => {
  const result = { ...content };

  missingKeys.forEach(path => {
    const keys = path.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    const lastKey = keys[keys.length - 1];
    if (!(lastKey in current)) {
      current[lastKey] = defaultValue;
    }
  });

  return result;
};