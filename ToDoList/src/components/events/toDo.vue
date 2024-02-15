<script>
import {mapState, mapActions} from 'pinia'
import {useEventsStore} from '../../stores/events'
export default {
    nom: 'toDo',
    
    props: {
        event: Object
    },
    data() {
        return {
            importanceTab: ["Pas Important","Peu Important","Important","Très Important","Urgent"],
            nom: '',
            lieu: '',
            importance: '',
        }
    },
    computed : {
        ...mapState(useEventsStore, ['getEventToEdit']),
    },
    methods: {
        ...mapActions(useEventsStore, ['deleteEvent','setEventToEdit','editEvent']),
        editCurrent() {
            const event = {
                    id: this.getEventToEdit.id,
                    nom: this.nom,
                    lieu: this.lieu,
                    date: this.date,
                    importance: this.importance
                }
            this.editEvent(event)
        }
    }
}
</script>

<template>
    <th scope="row"><input v-if="this.getEventToEdit == event" type="text" v-model="nom"><p v-else>{{ event.nom }}</p></th>
    <td><input v-if="this.getEventToEdit == event" type="text" v-model="lieu"><p v-else>{{ event.lieu }}</p></td>
    <td><input v-if="this.getEventToEdit == event" type="date" v-model="date"><p v-else>{{ event.date }}</p></td>
    <td>            
        <select v-if="this.getEventToEdit == event" class="form-select" id="importance" v-model="importance" required>
            <option selected disabled value="">Choose...</option>
            <option value="0">Pas important</option>
            <option value="1">Peu important</option>
            <option value="2">Important</option>
            <option value="3">Très important</option>
            <option value="4">Urgent</option>
        </select>
        <p v-else>{{ this.importanceTab[event.importance] }}</p></td>
    <td>
        <button v-if="this.getEventToEdit == event" class="btn btn-success" @click="editCurrent">Appliquer</button>
        <button v-else class="btn btn-warning" @click="setEventToEdit(event)">Modifier</button>
        <button class="btn btn-danger" @click="deleteEvent(event.id)">Supprimer</button>
    </td>
</template>