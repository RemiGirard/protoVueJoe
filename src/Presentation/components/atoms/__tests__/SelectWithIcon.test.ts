import { mount } from '@vue/test-utils';
import MySelect from '../SelectWithIcon.vue';
import { it, expect } from 'vitest';


const wrapper = mount(MySelect, {
  props: {
    value: 1,
    setValue: () => {},
  },
  slots: {
    default: '<option value="1">Option 1</option><option value="2">Option 2</option>',
  },
});

it('renders select with options', () => {
  const select = wrapper.find('select');
  expect(select.exists()).toBe(true);
  expect(select.html()).toContain('<option value="1">Option 1</option>');
  expect(select.html()).toContain('<option value="2">Option 2</option>');
});

it('binds value prop to select', async () => {
  await wrapper.setProps({ value: 2 });
  expect(wrapper.find('select').element.value).toBe('2');
});

it('trigger setValue function when select changes', async () => {
  let selectedValue = 0;
  const changeHandler = (value: number) => { selectedValue = value };
  await wrapper.setProps({ setValue: changeHandler });

  await wrapper.find('select').setValue('2');
  expect(selectedValue, 'Change event should update the selected value').toBe(2);
});