import { mount } from '@vue/test-utils';
import NumberSelect from '../NumberSelect.vue';
import { describe, it, expect } from 'vitest';

describe('renders and update values with 12345', () => {
  let baseValue = 1;
  const wrapper = mount(NumberSelect, {
    props: {
      value: baseValue,
      setValue: (newValue: number) => {
        baseValue = newValue;
      },
      min: 1,
      max: 5,
      step: 1,
    },
  });

  it('renders options based on props', () => {
    expect(wrapper.text()).toBe('12345');
  });

  it('updates value when select changes', async () => {
    await wrapper.find('select').trigger('change');
    expect(baseValue).toBe(1);

    await wrapper.find('select').setValue('4');
    expect(baseValue).toBe(4);
  });
})

describe('renders and update values with 135', () => {
  let baseValue = 3;
  const wrapper = mount(NumberSelect, {
    props: {
      value: baseValue,
      setValue: (newValue: number) => {
        baseValue = newValue;
      },
      min: 1,
      max: 6,
      step: 2,
    },
  });

  it('renders options based on props', () => {
    expect(wrapper.text()).toBe('135');
  });

  it('updates value when select changes', async () => {
    expect(baseValue).toBe(3);

    await wrapper.find('select').setValue('5');
    expect(baseValue).toBe(5);
  });
});
