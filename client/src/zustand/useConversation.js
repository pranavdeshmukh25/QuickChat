import { create } from 'zustand'

const useConversationStore = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
    messages: [],
    setMessage: (messages) => set({ messages }),
}))

export default useConversationStore;