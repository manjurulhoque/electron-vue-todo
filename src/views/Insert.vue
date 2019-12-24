<template>
    <div>
        <div class="vx-row mb-6">
            <div class="vx-col w-full">
                <vs-input class="w-full" label="Title" v-model="title" />
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col w-full">
                <datepicker
                    placeholder="Select Date"
                    v-model="date"
                ></datepicker>
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col w-full">
                <vs-button class="mr-3 mb-2" @click="add">Submit</vs-button>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { insertInfo } from "../utils/db";

export default {
    data() {
        return {
            date: "",
            title: ""
        };
    },
    components: {
        Datepicker
    },
    methods: {
        add() {
            if (this.title && this.date) {
                insertInfo(this.title, this.date)
                    .then(() => {
                        this.title = "";
                        this.date = "";
                        alert("Data inserted");
                        this.$router.push("/");
                    })
                    .catch(err => {
                        alert(err);
                    });
            } else {
                alert("All fields are mandatory");
            }
        }
    }
};
</script>
