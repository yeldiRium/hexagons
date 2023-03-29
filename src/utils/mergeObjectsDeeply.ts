import isPlainObject from 'lodash/isPlainObject';
import { UnionToIntersection } from 'type-fest';

type IntersectionOf<TArray extends any[]> = UnionToIntersection<TArray[number]>;

/**
 * This function is mainly meant for use in the `createEntity` method and
 * intended to merge components. This merge-function keeps getters/setters and
 * other quirks of properties, but it probably ignores many edge cases and is
 * not stable.
 */
const mergeObjectsDeeply = function <TSources extends any[]>(sources: TSources): IntersectionOf<TSources> {
  const targetObject: any = {};

  for (const source of sources) {
    for (const [ key, propertyDescriptor ] of Object.entries(Object.getOwnPropertyDescriptors(source))) {
      if ('value' in propertyDescriptor && isPlainObject(propertyDescriptor.value)) {
        if (targetObject[key] === undefined) {
          targetObject[key] = {};
        }
        targetObject[key] = mergeObjectsDeeply([ targetObject[key], propertyDescriptor.value ]);
      } else {
        Object.defineProperty(targetObject, key, propertyDescriptor);
      }
    }
  }

  return targetObject;
};

export type {
  IntersectionOf
};
export {
  mergeObjectsDeeply
};
