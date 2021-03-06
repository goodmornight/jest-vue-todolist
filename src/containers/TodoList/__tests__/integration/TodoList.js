/* eslint-disable no-undef */
import { mount, flushPromises } from '@vue/test-utils'
import TodoList from '../../TodoList'
import store from '../../../../store'
import axios from '../../__mocks__/axios'
// jest.useFakeTimers()
beforeEach(() => {
  axios.success = true
  jest.useFakeTimers()
})
// jest.mock('../../__mocks__/axios')

it(`
  1. 用户会在header输入框输入内容
  2. 用户会点击回车按钮
  3. 列表项应该增加用户输入内容的列表项
`, async () => {
  const wrapper = mount(TodoList, {
    global: {
      plugins: [store]
    }
  })
  const inputElem = wrapper.get('[data-test="header-input"]')
  const content = 'some value'
  await inputElem.setValue(content)
  await inputElem.trigger('change')
  await inputElem.trigger('keyup.enter')
  const listItems = wrapper.findAll('[data-test="todo-item"]')
  expect(listItems).toHaveLength(3)
  expect(listItems[2].text()).toContain(content)
})

it(`
  1. 用户进入页面时，请求远程数据
  2. 列表应该展示远程返回的数据
`, async () => {
  const wrapper = mount(TodoList, {
    global: {
      plugins: [store]
    }
  })
  await flushPromises()
  const listItems = wrapper.findAll('[data-test="todo-item"]')
  expect(listItems).toHaveLength(3)
})

it(`
  1. 用户进入页面时，请求远程数据失败
  2. 列表应该展示空数据，不应该挂掉
`, async () => {
  axios.success = false
  const wrapper = mount(TodoList, {
    global: {
      plugins: [store]
    }
  })
  await flushPromises()
  const listItems = wrapper.findAll('[data-test="todo-item"]')
  expect(listItems).toHaveLength(0)
})
// it(`
//   1. 用户进入页面时，请求远程数据
//   2. 列表应该展示远程返回的数据
// `, async () => {
//   const wrapper = mount(TodoList, {
//     global: {
//       plugins: [store]
//     }
//   })
//   jest.runAllTimers()
//   await flushPromises()
//   const listItems = wrapper.findAll('[data-test="todo-item"]')
//   expect(listItems).toHaveLength(2)
// })
