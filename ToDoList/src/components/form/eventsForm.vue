<script>
import {mapActions} from 'pinia'
import {useEventsStore} from '../../stores/events'

export default {
    name: 'eventsForm',
    data(){
        return{
            nom: '',
            lieu: '',
            date: '',
            importance: ''
        }
    },
    methods: {
        submitForm() {
            console.log(this.date)
            const event = {
                id: Date.now()*Math.random(),
                nom: this.nom,
                lieu: this.lieu,
                date: this.date,
                importance: this.importance
            }
            this.addEvent(event)
        },
        ...mapActions(useEventsStore, ['addEvent']),
    }
}
</script>

<template>
    <h1>Créer un nouveau évènement</h1>
    <div clas="form">
        <form @submit.prevent="submitForm" class="row g-3">
            <div class="col-md-4">
                <label for="nom" class="form-label">Nom de la tache</label>
                <input type="text" class="form-control" id="nom" v-model="nom" required>
            </div>
            <div class="col-md-4">
                <label for="validationDefault02" class="form-label">Date</label>
                <input type="date" class="form-control" id="validationDefault02" v-model="date" required>
            </div>
            <div class="col-md-6">
                <label for="lieu" class="form-label">Lieu</label>
                <input type="text" class="form-control" id="lieu" v-model="lieu" required>
            </div>
            <div class="col-md-3">
                <label for="importance" class="form-label">Importance</label>
                <select class="form-select" id="importance" v-model="importance" required>
                    <option selected disabled value="">Choose...</option>
                    <option value="Pas important">Pas important</option>
                    <option value="Peu important">Peu important</option>
                    <option value="Important">Important</option>
                    <option value="Très important">Très important</option>
                    <option value="Urgent">Urgent</option>
                </select>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" type="submit">Submit form</button>
            </div>
        </form>
    </div>
</template>