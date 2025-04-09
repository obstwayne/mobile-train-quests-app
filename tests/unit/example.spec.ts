import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { describe, expect, test } from 'vitest'

describe('Home.vue', () => {
  test('renders tab Home', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toMatch('Tab 1 page')
  })
})
