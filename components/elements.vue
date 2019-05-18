<template lang="pug">
    #elements(v-if="elementsList", style="min-height: 68px")
        v-alert.ma-2(:value="elementsList.length == 0", outline, type="info") No hay elementos creados todavía
        v-alert.mt-0(:value="deleteElementList.length != 0", type="warning") Eliminar los elementos marcados también elminará los subelementos
        draggable(v-if="dragging", v-model="elementsList", :options="{draggable:'.item'}")
            v-list-tile.item.py-1(v-for="(element, index) in elementsList", :key="index")
                v-list-tile-avatar
                    v-icon drag_indicator
                v-list-tile-avatar
                    v-icon {{ element.Type | geticon }}
                v-list-tile-content
                    v-list-tile-title.ps {{ element.Title }}
                    v-list-tile-sub-title {{ element.AuthorName }}
        v-list-tile.item.py-1(v-else, v-for="(element, index) in elements", :key="index") 
            v-list-tile-avatar(@click="goToElement(element.id)")
                v-icon {{ element.Type | geticon }}
            v-list-tile-content(@click="goToElement(element.id)")
                v-list-tile-title.ps {{ element.Title }}
                v-list-tile-sub-title {{ element.AuthorName }}
            v-list-tile-action
                v-checkbox(v-if="admin", v-model="deleteElementList", :value="element.id")
</template>

<script>
import draggable from 'vuedraggable'
import { getIcon } from '@/tools'

export default {

    data() {
        return {
            elementsList: []
        }
    },

    beforeMount() {
        this.elementsList = [...this.elements]
    }, 

    props: ['elements', 'dragging', 'admin'],

    components: {
        draggable
    },

    filters: {
        geticon: function (value) {
            return getIcon(value)
        }
    },

    computed: {
        deleteElementList: {
            get() {
                return this.$store.state.page.deleteElementList
            },

            set(val) {
                this.$store.commit('page/setDeleteElementList', val)
            }
        },

    },

    methods: {
        goToElement(id) {
            this.$router.push({path: `${window.location.pathname}/${id}`})
        },

    },

    destroyed() {
        this.deleteElementList = []
    }
}
</script>