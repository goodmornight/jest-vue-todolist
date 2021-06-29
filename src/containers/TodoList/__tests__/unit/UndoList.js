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
      propsData: { list: [1, 2, 3] }
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
      propsData: { list: [1, 2, 3] }
    })
    const deleteButtons = wrapper.find('[data-test="delete-button"]')
    deleteButtons.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
  })
})
