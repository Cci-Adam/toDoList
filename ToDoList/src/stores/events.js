
import { defineStore } from 'pinia'

const STORE_NAME = 'events'
const STORE_LOCALE_STORAGE_KEY = 'events'

const getDefaultState = () => []
const getCurrentState = () => {
    const localeData = localStorage.getItem(STORE_LOCALE_STORAGE_KEY)
    return localeData ? JSON.parse(localeData) : getDefaultState()
}

export const useEventsStore = defineStore(STORE_NAME, {
  state: () => {
    return {
      events: getCurrentState()
    }
  },
  getters: {
    getEvents: (state) => state.events
  },
  actions: {
    updateLocaleStorage() {
      localStorage.setItem(STORE_LOCALE_STORAGE_KEY, JSON.stringify(this.events))
    },
    addEvent(event) {
      this.events.push(event)
      this.updateLocaleStorage()
    },
    deleteEvent(id) {
      this.events = this.events.filter(event => event.id !== id)
      this.updateLocaleStorage()
    },
    
  }
})