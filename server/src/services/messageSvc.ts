import MessageModel, { Message } from "@/models/messageMdl"

interface CreateMessageInput
    extends Pick<Message, "content" | "sender" | "recipient"> {}

export const createMessage = async (input: CreateMessageInput) => {
    const createdMessage = await MessageModel.create(input)

    return createdMessage.toObject()
}

export const findMessageById = async (messageId: string) => {
    const message = await MessageModel.findById(messageId)
        .populate("sender recipient")
        .lean()
        .exec()

    return message
}

export const markMessageAsRead = async (messageId: string) => {
    const message = await MessageModel.findByIdAndUpdate(
        messageId,
        { readAt: new Date() },
        { new: true }
    )
        .lean()
        .exec()

    return message
}

export const deleteMessage = async (messageId: string) => {
    await MessageModel.findByIdAndDelete(messageId).exec()
}
