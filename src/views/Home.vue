<template>
    <div>
        <vs-table :data="infos">
            <template slot="thead">
                <vs-th>Id</vs-th>
                <vs-th>Title</vs-th>
                <vs-th>Date</vs-th>
                <vs-th>Action</vs-th>
            </template>

            <template slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="data[indextr].id">
                        {{ data[indextr].id }}
                    </vs-td>

                    <vs-td :data="data[indextr].title">
                        {{ data[indextr].title }}
                    </vs-td>

                    <vs-td :data="data[indextr].date">
                        {{
                            moment(data[indextr].date).format(
                                "DD-MM-YYYY HH:mm:ss"
                            )
                        }}
                    </vs-td>

                    <vs-td :data="data[indextr].id">
                        <vs-button
                            color="success"
                            type="filled"
                            @click="editInfo(data[indextr].id)"
                            style="margin-right: 10px"
                            >Edit</vs-button
                        >
                        <vs-button
                            color="danger"
                            type="filled"
                            @click="deleteInfoById(data[indextr].id)"
                            >Delete</vs-button
                        >
                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>

        <vs-prompt
            class="calendar-event-dialog"
            title="Update Info"
            accept-text="Update Info"
            @accept="updateInfoById"
            :is-valid="validForm"
            :active.sync="activePromptEdit"
        >
            <vs-input
                name="title"
                class="w-full"
                label-placeholder="Title"
                v-model="info.title"
            ></vs-input>
            <div class="my-4">
                <small class="date-label">Date</small>
                <datepicker name="date" v-model="info.date"></datepicker>
            </div>
        </vs-prompt>
    </div>
</template>

<script>
import { queryAllInfo, deleteInfo, updateInfo } from "../utils/db";
import Datepicker from "vuejs-datepicker";

export default {
    components: {
        Datepicker
    },
    data() {
        return {
            infos: [],
            errors: {},
            info: {
                date: "",
                title: ""
            },
            id: 0,
            activePromptEdit: false
        };
    },
    mounted() {
        this.init();
    },
    computed: {
        validForm() {
            return this.title != "" && this.date != "";
        }
    },
    methods: {
        init() {
            queryAllInfo().then(data => {
                this.infos = data;
            });
        },
        editInfo(id) {
            this.infos.filter(data => {
                if (data.id == id) {
                    this.id = id;
                    this.info = {
                        date: new Date(data.date),
                        id: id,
                        title: data.title
                    };
                }
            });
            this.disabledFrom = true;
            this.activePromptEdit = true;
        },
        updateInfoById() {
            updateInfo(this.id, this.info.title, this.info.date)
                .then(() => {
                    alert("Info updated");
                    this.init();
                })
                .catch(err => alert(err));
        },
        deleteInfoById(id) {
            deleteInfo(id)
                .then(() => {
                    this.init();
                })
                .catch(err => {
                    alert(err);
                });
        }
    }
};
</script>
