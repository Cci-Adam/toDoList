<script>
import {mapState, mapActions} from 'pinia'
import {useEventsStore} from '../../stores/events'

export default {
    name: 'eventsTable',
    data() {
        return {
            events: [],
            sort : -1,
            importanceTab: ["Pas Important","Peu Important","Important","Très Important","Urgent"],
        }
    },
    mounted() {
        this.events = this.getEvents
    },
    watch: {
        getEvents() {
            console.log("xe")
            this.events = this.getEvents
        }
    },
    computed: {
        ...mapState(useEventsStore, ['getEvents']),
        
    },
    methods: {
        ...mapActions(useEventsStore, ['deleteEvent','setEventToEdit']),
        sortEventsByDate() {
            if (this.sort != 0) {
                this.sort = 0
                this.events = this.events.sort((a, b) => (new Date(a.date) - new Date(b.date)))
            }
            else if (this.sort != 1) {
                this.sort = 1
                this.events = this.events.sort((a, b) => (new Date(b.date) - new Date(a.date)))
            }
        },
        sortEventsByImportance() {
            if (this.sort != 2) {
                this.sort = 2
                this.events = this.events.sort((a, b) => (a.importance - b.importance))
            }
            else if (this.sort != 3) {
                this.sort = 3
                this.events = this.events.sort((a, b) => (b.importance - a.importance))
            }
        }
    }
}
</script>

<template>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">Nom</th>
            <th scope="col">Lieu</th>
            <th scope="col" @click="sortEventsByDate()">{{this.sort == 0 ? 'Date ⇩' : this.sort == 1 ? 'Date ⇧' : 'Date'}}</th>
            <th scope="col" @click="sortEventsByImportance()">{{this.sort == 2 ? 'Importance ⇩' : this.sort == 3 ? 'Importance ⇧' : 'Importance'}}</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="event in this.events" :key="event.id">
                <th scope="row">{{ event.nom }}</th>
                <td>{{ event.lieu }}</td>
                <td>{{ event.date }}</td>
                <td>{{ this.importanceTab[event.importance] }}</td>
                <td>
                    <button class="btn btn-warning" @click="setEventToEdit(event)">Modifier</button>
                    <button class="btn btn-danger" @click="deleteEvent(event.id)">Supprimer</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>