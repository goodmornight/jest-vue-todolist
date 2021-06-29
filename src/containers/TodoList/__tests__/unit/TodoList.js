/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import TodoList from '../../TodoList'
import Header from '../../components/Header'

it('TodoList 初始化，undolist 为空', () => {
  const wrapper = shallowMount(TodoList)
  const undolist = wrapper.vm.$data.undolist
  expect(undolist).toEqual([])
})

it('TodoList 监听到 Header 的 add 事件时，会增加一个内容', async () => {
  const wrapper = shallowMount(TodoList)
  const header = wrapper.findComponent(Header)
  const content = 'some value'
  header.vm.$emit('add', content)
  const undolist = wrapper.vm.$data.undolist
  console.log(undolist)
  expect(undolist).toEqual(['some value'])
})
