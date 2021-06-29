/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Header from '../../components/Header'

describe('Header 组件', () => {
  it('包含 input 框', () => {
    const wrapper = shallowMount(Header)
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
  })

  it('input 框初始内容为空', () => {
    const wrapper = shallowMount(Header)
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('')
  })

  it('input 框值内容发生变化，数据应该跟着变', () => {
    const wrapper = shallowMount(Header)
    const input = wrapper.find('input')
    input.setValue('some value')
    const inputValue = wrapper.vm.$data.inputValue
    expect(inputValue).toBe('some value')
  })

  it('input 框输入回车，无内容无反应', () => {
    const wrapper = shallowMount(Header)
    const input = wrapper.find('input')
    input.setValue('')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeFalsy()
  })

  it('input 框输入回车，有内容时向外触发事件,同时清空 inputValue', () => {
    const wrapper = shallowMount(Header)
    const input = wrapper.find('input')
    input.setValue('some value')
    input.trigger('keyup.enter')
    const inputValue = wrapper.vm.$data.inputValue
    expect(wrapper.emitted().add).toBeTruthy()
    expect(inputValue).toBe('')
  })
})
