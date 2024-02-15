<script>
import {mapState, mapActions} from 'pinia'
import {useEventsStore} from '../../stores/events'

export default {
    name: 'eventsTable',
    data() {
        return {
            events: [],
            sort : -1,
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
            <th scope="col">Importance</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="event in this.events" :key="event.id">
                <th scope="row">{{ event.nom }}</th>
                <td>{{ event.lieu }}</td>
                <td>{{ event.date }}</td>
                <td>{{ event.importance }}</td>
                <td>
                    <button class="btn btn-warning" @click="setEventToEdit(event)">Modifier</button>
                    <button class="btn btn-danger" @click="deleteEvent(event.id)">Supprimer</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>