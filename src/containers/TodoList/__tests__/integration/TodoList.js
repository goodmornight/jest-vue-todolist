/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import TodoList from '../../TodoList'

it(`
  1. 用户会在header输入框输入内容
  2. 用户会点击回车按钮
  3. 列表项应该增加用户输入内容的列表项
`, async () => {
  const wrapper = mount(TodoList)
  const inputElem = wrapper.get('[data-test="header-input"]')
  const content = 'lili'
  await inputElem.setValue(content)
  await inputElem.trigger('change')
  await inputElem.trigger('keyup.enter')
  const listItems = wrapper.findAll('[data-test="todo-item"]')
  expect(listItems).toHaveLength(1)
  expect(listItems[0].text()).toContain(content)
})
