
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
      events: getCurrentState(),
      eventToEdit: null,
    }
  },
  getters: {
    getEvents: (state) => state.events,
    getEventToEdit: (state) => state.eventToEdit,
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
      console.log(this.events)
      this.updateLocaleStorage()
    },
    setEventToEdit(event) {
      console.log(event)
      this.eventToEdit = event
    },
    editEvent(event) {
      const index = this.events.findIndex(e => e.id === event.id)
      this.events[index] = event
      this.eventToEdit = null
      this.updateLocaleStorage()
    }
  }
})