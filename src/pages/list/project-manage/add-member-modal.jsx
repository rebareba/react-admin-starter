import {observer} from 'mobx-react'
import {Form, Modal, Select, message} from 'antd'

const AddMemberModal = ({store}) => {
  const {visibleModal} = store
  return (
    <Modal
      visible={visibleModal === 'addMemberModal'}
      title="编辑成员"
      className="edit-chance"
      maskClosable={false}
      onCancel={() =>
        store.set({
          visibleModal: '',
          projectDetail: {},
          isEditProject: false,
        })
      }
      // onOk={this.handleSubmit}
    >
      编辑成员
    </Modal>
  )
}
export default observer(AddMemberModal)
