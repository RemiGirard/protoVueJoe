import { mount } from '@vue/test-utils';
import MyButton from '../button/NoDecButton.vue';
import {it, expect} from "vitest";

let clickCount= 0;

const wrapper = mount(MyButton, {
    props: {
        onClick: () => {clickCount++},
    },
    slots: {default: 'Click me'},
});
it('renders button text', () => {
    expect(wrapper.text()).toBe('Click me');
});
it('triggers click event', async () => {
    await wrapper.find('button').trigger('click');
    expect(clickCount).toBe(1);
    await wrapper.find('button').trigger('click');
    await wrapper.find('button').trigger('click');
    expect(clickCount).toBe(3);
});
