import { mergeObjectsDeeply } from '../../../src/utils';

describe('mergeObjectsDeeply', (): void => {
  test('merges two empty objects into an empty one.', async (): Promise<void> => {
    const object1 = {};
    const object2 = {};

    const mergedObject = mergeObjectsDeeply([ object1, object2 ]);

    expect(mergedObject).toEqual({});
  });

  test('merges two one-level-deep objects.', async (): Promise<void> => {
    const object1 = {
      foo: 'foo'
    };
    const object2 = {
      bar: 'bar'
    };

    const mergedObject = mergeObjectsDeeply([ object1, object2 ]);

    expect(mergedObject).toEqual({
      foo: 'foo',
      bar: 'bar'
    });
  });

  test('latter objects overwrite previous objects.', async (): Promise<void> => {
    const object1 = {
      foo: 'foo'
    };
    const object2 = {
      foo: 'bar'
    };

    const mergedObject = mergeObjectsDeeply([ object1, object2 ]);

    expect(mergedObject).toEqual({
      foo: 'bar'
    });
  });

  test('merges objects deeply.', async (): Promise<void> => {
    const object1 = {
      foo: 'foo',
      nested: {
        foo: 'foo'
      }
    };
    const object2 = {
      bar: 'bar',
      nested: {
        bar: 'bar'
      }
    };

    const mergedObject = mergeObjectsDeeply([ object1, object2 ]);

    expect(mergedObject).toEqual({
      foo: 'foo',
      bar: 'bar',
      nested: {
        foo: 'foo',
        bar: 'bar'
      }
    });
  });

  test('keeps getters and setters.', async (): Promise<void> => {
    const object1 = {
      foo: 'foo',
      nested: {
        get heck (): string {
          return 'heck';
        }
      }
    };
    const object2 = {
      bar: 'bar',
      nested: {
        bar: 'bar'
      }
    };

    const mergedObject = mergeObjectsDeeply([ object1, object2 ]);

    const propertyDescriptorForNestedObject = Object.getOwnPropertyDescriptor(mergedObject.nested, 'heck')!;

    expect(typeof propertyDescriptorForNestedObject.get).toBe('function');
    expect(propertyDescriptorForNestedObject.set).toBeUndefined();
    expect(propertyDescriptorForNestedObject.writable).toBeUndefined();
  });
});
