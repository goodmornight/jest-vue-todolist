/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import UndoList from '../../components/UndoList'
import { findTestWrapper } from '../../../../utils/testUtils'

describe('UndoList 组件', () => {
  it('参数为[]，count值应该为0，且列表无内容', () => {
    const wrapper = shallowMount(UndoList)
    const countElem = wrapper.find('[data-test="count"]')
    const listItem = findTestWrapper(wrapper, 'item')
    expect(countElem.text()).toBe('0')
    expect(listItem.length).toBe(0)
  })

  it('参数为[1，2，3]，count值应该为3，且列表有内容，且存在删除按钮', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [
          { status: 'div', value: 1 },
          { status: 'div', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const countElem = wrapper.find('[data-test="count"]')
    const listItem = findTestWrapper(wrapper, 'item')
    const deleteButtons = findTestWrapper(wrapper, 'delete-button')
    expect(countElem.text()).toBe('3')
    expect(listItem.length).toBe(3)
    expect(deleteButtons.length).toBe(3)
  })

  it('删除按钮被点击时，向外触发删除事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [
          { status: 'div', value: 1 },
          { status: 'div', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const deleteButtons = wrapper.find('[data-test="delete-button"]')
    deleteButtons.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
  })

  it('列表项被点击时，向外触发 status 事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [
          { status: 'div', value: 1 },
          { status: 'div', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const listItem = wrapper.find('[data-test="item"]')
    listItem.trigger('click')
    expect(wrapper.emitted().status).toBeTruthy()
    // expect(wrapper.emitted().status[0][0]).toBe(1)
  })

  it('列表项显示一个输入框，两个正常列表内容', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [
          { status: 'div', value: 1 },
          { status: 'input', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const input = findTestWrapper(wrapper, 'input')
    // expect(input.at(0).element.value).toBe('2')
    expect(input.length).toBe(1)
  })

  it('输入框失去焦点时，向外触发 reset 事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [
          { status: 'div', value: 1 },
          { status: 'input', value: 2 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const inputElem = findTestWrapper(wrapper, 'input').at(0)
    inputElem.trigger('blur')
    expect(wrapper.emitted().reset).toBeTruthy()
  })

  it('输入框变化时，向外触发 change 事件', () => {
    const wrapper = shallowMount(UndoList, {
      propsData: {
        list: [
          { status: 'div', value: 1 },
          { status: 'input', value: 123 },
          { status: 'div', value: 3 }
        ]
      }
    })
    const inputElem = findTestWrapper(wrapper, 'input').at(0)
    inputElem.trigger('change')
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change[0][0]).toEqual({
      value: '123', index: 1
    })
  })
})
