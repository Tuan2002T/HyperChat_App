const chatGroupModel = require("../Model/chatGroupModel");
const userModel = require("../Model/userModel");

const createChatGroup = async (req, res) => {

    const  {groupName, members} = req.body;
    try {
        const chatGroup = await chatGroupModel.findOne({ groupName });
        if (chatGroup) {
            return res.status(400).json({ message: "Nhóm chat đã tồn tại" });
        }

        const newChatGroup = new chatGroupModel({groupName, members});

        const savedChatGroup = await newChatGroup.save();

        
        res.status(200).json(savedChatGroup);
    } catch (error) {

        console.log('error', error.message);

        res.status(500).json({ message: error.message });
    }
};

const getChatGroupById = async (req, res) => {
    try {
        const chatGroup = await chatGroupModel.findById(req.params.id);
        if (!chatGroup) {
            return res.status(404).json({ message: "Không tìm thấy ChatGroup " });
        }
        res.status(200).json(chatGroup);
    } catch (error) {
        console.log('Lỗi tìm chatgroup', error);
        res.status(404).json({ message: error.message });
    }
};

const addMemberToChatGroup = async (req, res) => {
    const { chatGroupId, userId } = req.body;
    try {
        const chatGroup = await chatGroupModel.findById(chatGroupId);
        if (!chatGroup) {
            return res.status(404).json({ message: "Không tìm thấy ChatGroup " });
        }

        if(chatGroup.members.includes(userId)){
            return res.status(400).json({message: "Người dùng đã tồn tại trong nhóm chat"});
        }
        chatGroup.members.push(userId);



        const updatedChatGroup = await chatGroup.save();

        res.status(200).json(updatedChatGroup);
    }
    catch (error) {
        console.log('Lỗi tìm chatgroup', error);
        res.status(404).json({ message: error.message });
    }
}

const deleteUserChatGroup = async (req, res) => {
    const { chatGroupId, userId } = req.body;
    try {
        const chatGroup = await chatGroupModel.findById(chatGroupId);
        if (!chatGroup.members.includes(userId)) {
            return res.status(400).json({ message: "Người dùng không phải là thành viên của nhóm chat." });
        }

        chatGroup.members = chatGroup.members.filter(memberId => memberId.toString() !== userId);
        const updatedChatGroup = await chatGroup.save();
        res.status(200).json(updatedChatGroup);

    } catch (error) {
        console.log('Xoá người dùng khỏi nhóm chat không thành công', error);
        res.status(404).json({ message: error.message });
    }
}
        
const deleteChatGroup = async (req, res) => {
    try {
        const deletedChatGroup = await chatGroupModel.findByIdAndDelete(req.params.idChatGroup);

        if (!deletedChatGroup) {
            return res.status(404).json({ message: "Không tìm thấy nhóm chat để xóa." });
        }

        res.status(200).json({ message: "Nhóm chat đã được xóa thành công." });
    } catch (error) {
        console.error('Lỗi khi xóa nhóm chat:', error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi xóa nhóm chat." });
    }
};     

// const deleteChatGroup = async (req, res) => {
//     try {
//         const chatGroup = await chatGroupModel.findByIdAndDelete(req.params.id);
//         if (!chatGroup) {
//             return res.status(404).json({ message: "Không tìm thấy ChatGroup " });
//         }
//         res.status(200).json(chatGroup);
//     }
//     catch (error) {
//         console.log('Lỗi tìm chatgroup', error);
//         res.status(404).json({ message: error.message });
//     }
// }
module.exports = { createChatGroup, getChatGroupById, addMemberToChatGroup, deleteUserChatGroup, deleteChatGroup};