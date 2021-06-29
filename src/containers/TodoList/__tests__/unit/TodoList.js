/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import TodoList from '../../TodoList'
// import Header from '../../components/Header'
import UndoList from '../../components/UndoList'

describe('TodoList 组件', () => {
  it('初始化，undolist 为空', () => {
    const wrapper = shallowMount(TodoList)
    const undolist = wrapper.vm.$data.undolist
    expect(undolist).toEqual([])
  })

  it('监听到 Header 的 add 事件时，会增加一个内容', async () => {
    const wrapper = shallowMount(TodoList)
    const content = 'some value'
    wrapper.vm.addUndoItem(content)
    expect(wrapper.vm.$data.undolist).toEqual([{ status: 'div', value: 'some value' }])

    // const wrapper = shallowMount(TodoList)
    // const header = wrapper.findComponent(Header)
    // const content = 'some value'
    // header.vm.$emit('add', content)
    // const undolist = wrapper.vm.$data.undolist
    // expect(undolist).toEqual(['some value'])
  })

  it('调用UndoList，应该传递list参数', async () => {
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.findComponent(UndoList)
    const list = undoList.props('list')
    expect(list).toBeTruthy()
  })

  it('中调用handleItemDelete方法，undolist列表内容会减少一个', async () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undolist: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }
      ]
    })
    wrapper.vm.handleItemDelete(1)
    expect(wrapper.vm.$data.undolist).toEqual([
      { status: 'div', value: 1 },
      { status: 'div', value: 3 }
    ])
  })

  it('changeStatus 方法执行时，UndoList 内容变化', async () => {
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undolist: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }
      ]
    })
    wrapper.vm.changeStatus(1)
    expect(wrapper.vm.$data.undolist).toEqual([
      { status: 'div', value: 1 },
      { status: 'input', value: 2 },
      { status: 'div', value: 3 }
    ])
  })
})
