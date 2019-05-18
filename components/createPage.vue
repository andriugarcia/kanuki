<template lang="pug">
    v-dialog(v-model="dialog", width="800")
        v-btn(slot="activator", flat, icon)
            v-icon add
        v-toolbar(color="yellow darken-1")
            v-btn(icon, flat, @click="dialog = false")
                v-icon close
            v-toolbar-title.ps Nueva página
            v-text-field.mx-4(v-model="searchFilter", solo, slot="extension", hide-details, prepend-inner-icon="search", :label="$t('search')", color="primary")
        v-card.pt-3(color="lit", style="overflow-y: scroll; height: 70vh")
            v-card.item.mb-2.mx-3(v-for="element in renderListFiltered", avatar, :key="element.Type")
                v-layout.pa-3(@click="createPage(element.Type)")
                    v-icon.ma-2 {{ getIcon(element.Type) }}
                    div.ml-3
                        .ps.font-weight-bold {{ element.Title }}
                        div {{ element.Subtitle }}
</template>

<script>
    import format from '@/format'
    import {getIcon} from '@/tools'

    // import TextCreator from 'components/creator/text/Text.vue'
    // import TableCreator from 'components/creator/text/Table.vue'
    // import ListCreator from 'components/creator/text/List.vue'
    // import TextFormatCreator from 'components/creator/text/TextFormat.vue'

    // import MediaImageCreator from 'components/creator/media/Image.vue'
    // import MediaVideoCreator from 'components/creator/media/Video.vue'
    // import MediaAudioCreator from 'components/creator/media/Audio.vue'
    // import MediaYoutubeCreator from 'components/creator/media/Youtube.vue'
    // import MediaPdfCreator from 'components/creator/media/PDF.vue'
    // import MediaGalleryCreator from 'components/creator/media/Gallery.vue'
    // import MediaCollageCreator from 'components/creator/media/Collage.vue'

    // import DocumentsDocCreator from 'components/creator/documents/Doc.vue'
    // import DocumentsSpreadsheetCreator from 'components/creator/documents/Spreadsheet.vue'
    // import DocumentsPresentationCreator from 'components/creator/documents/Presentation.vue'

    // import ExerciseCardCreator from 'components/creator/exercise/Card.vue'
    // import ExerciseConnectCreator from 'components/creator/exercise/Connect.vue'
    // import ExerciseTestCreator from 'components/creator/exercise/Test.vue'
    // import ExerciseWriteCreator from 'components/creator/exercise/Write.vue'

    // import TechCodeCreator from 'components/creator/tech/Code.vue'
    // import TechLinechartCreator from 'components/creator/tech/LineChart.vue'
    // import TechMathCreator from 'components/creator/tech/Math.vue'


  export default {
    data () {
      return {
        e1: 1,
        dialog: false,
        searchFilter: '',
        renderList: [
            {
                Title: "Sección",
                Subtitle: this.$t('textSubtitle'),
                Type: 'section',
                Color: 'gray darken-1',
            },
            {
                Title: this.$t('text'),
                Subtitle: this.$t('textSubtitle'),
                Type: 'text/text',
                Color: 'yellow darken-1',
                Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Text.svg?alt=media&token=b61d61b3-36de-4d17-be05-e60ada5ba572'
            },
            {
                Title: 'Editor de Texto',
                Subtitle: 'Editor de texto enriquecido',
                Type: 'text/textformat',
                Color: 'yellow darken-1',
                Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/TextFormat.svg?alt=media&token=0b7443d5-3ef9-4510-993e-3dd67f720176'
            },
            // {
            //     Title: this.$t('list'),
            //     Subtitle: this.$t('listSubtitle'),
            //     Type: 'text/list',
            //     Color: 'yellow darken-1',
            //     Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/List.svg?alt=media&token=e522a37c-6fc8-4518-91c7-fac751a38099'
            // },
            // {
            //     Title: this.$t('table'),
            //     Subtitle: this.$t('tableSubtitle'),
            //     Type: 'text/table',
            //     Color: 'yellow darken-1',
            //     Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Table.svg?alt=media&token=64c42d3f-723e-4a38-a136-5901ca9347b1'
            // },
            {
                Title: this.$t('image'),
                Subtitle: this.$t('imageSubtitle'),
                Type: 'media/image',
                Color: 'red darken-1',
                Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Image.svg?alt=media&token=234346aa-4493-4533-8ec7-b357879be0a4'
            },
            {
                Title: this.$t('video'),
                Subtitle: this.$t('videoSubtitle'),
                Type: 'media/video',
                Color: 'red darken-1',
                Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Video.svg?alt=media&token=60cabd75-b916-4526-9659-df76b3a1d9a1'
            },
            {
                Title: 'Youtube',
                Subtitle: this.$t('youtubeSubtitle'),
                Type: 'media/youtube',
                Color: 'red darken-1',
                Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Video.svg?alt=media&token=60cabd75-b916-4526-9659-df76b3a1d9a1'
            },
            {
                Title: this.$t('audio'),
                Subtitle: this.$t('audioSubtitle'),
                Type: 'media/audio',
                Color: 'red darken-1',
                Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Audio.svg?alt=media&token=b6fae574-ca54-414e-87bc-bda9df2ceda4'
            },
            {
                Title: this.$t('pdf'),
                Subtitle: this.$t('pdfSubtitle'),
                Type: 'media/pdf',
                Color: 'red darken-1',
                Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Audio.svg?alt=media&token=b6fae574-ca54-414e-87bc-bda9df2ceda4'
            },
            // {
            //     Title: this.$t('galery'),
            //     Subtitle: this.$t('galerySubtitle'),
            //     Type: 'media/gallery',
            //     Color: 'red darken-1',
            //     Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Galery.svg?alt=media&token=d3f08c41-2888-48e4-8aed-19c6437582e0'
            // },
            // {
            //     Title: this.$t('collage'),
            //     Subtitle: this.$t('collageSubtitle'),
            //     Type: 'media/collage',
            //     Color: 'red darken-1',
            //     Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Collage.svg?alt=media&token=5b9d133d-b772-402a-bcce-42c123df0714'
            // },
            {
                Title: 'Documento',
                Subtitle: 'Documentos de texto, tablas de datos, presentaciones...',
                Type: 'documents/doc',
                Color: 'blue darken-1',
                Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Collage.svg?alt=media&token=5b9d133d-b772-402a-bcce-42c123df0714'
            },
            // {
            //     Title: this.$t('card'),
            //     Subtitle: this.$t('cardSubtitle'),
            //     Type: 'exercise/card',
            //     Color: 'green darken-1',
            //     Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Card.svg?alt=media&token=926d7b69-c52a-4402-87fd-651b8dcaf7fd'
            // },
            // {
            //     Title: this.$t('connect'),
            //     Subtitle: this.$t('connectSubtitle'),
            //     Type: 'exercise/connect',
            //     Color: 'green darken-1',
            //     Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Connect.svg?alt=media&token=03852784-15fa-42fd-8d76-6ab5a2386995'
            // },
            {
                Title: 'Test',
                Subtitle: 'Ejercicios de tipo Test',
                Type: 'exercise/test',
            },
            {
                Title: 'Formulario',
                Subtitle: 'Haz encuestas a tiempo real',
                Type: 'exercise/form',
            },
            // {
            //     Title: this.$t('write'),
            //     Subtitle: this.$t('writeSubtitle'),
            //     Type: 'exercise/write',
            //     Color: 'green darken-1',
            //     Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Write.svg?alt=media&token=07f7be4a-3b2b-468e-b6d0-abb9fd6c8ab6'
            // },
            // {
            //     Title: this.$t('code'),
            //     Subtitle: this.$t('codeSubtitle'),
            //     Type: 'tech/code',
            //     Color: 'blue darken-1',
            //     Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Code.svg?alt=media&token=eb58f33c-7480-493e-802b-7467fedcecbd'
            // },
            {
                Title: "Line Chart",
                Subtitle: "Graph description",
                Type: 'tech/linechart',
            },
            {
                Title: "Bar Chart",
                Subtitle: "Graph description",
                Type: 'tech/barchart',
            },
            {
                Title: "Doughnut Chart",
                Subtitle: "Graph description",
                Type: 'tech/doughnut',
            },
            {
                Title: "Polar Area Chart",
                Subtitle: "Graph description",
                Type: 'tech/polararea',
            },
            {
                Title: "Business Model Canvas",
                Subtitle: "Plantilla de BMC",
                Type: 'business/bmc',
            },
            {
                Title: "DAFO",
                Subtitle: "Plantilla de DAFO",
                Type: 'business/dafo',
            },
            {
                Title: "Tamaño de mercado",
                Subtitle: "Análisis de TAM SAM SOM",
                Type: 'business/tam',
            },
            // {
            //     Title: "Votación",
            //     Subtitle: "Crea un tema a tratar y permite a los usuarios votar sobre esa temática",
            //     Type: 'game/voting',
            //     Color: 'red darken-1'
            // },
            // {
            //     Title: "Código QR",
            //     Subtitle: "Crea un código QR de un enlace o texto",
            //     Type: 'media/qr',
            //     Color: 'red darken-1'
            // },
            // {
            //     Title: "Lean Canvas",
            //     Subtitle: "Crea tu propio Lean Canvas",
            //     Type: 'business/lc'
            // },
            // {
            //     Title: "Curriculum Vitae",
            //     Subtitle: "Crea una tarjeta con información profesional",
            //     Type: 'business/cv'
            // },
            // {
            //     Title: "Gráfica de líneas",
            //     Subtitle: "Crea una gráfica con líneas",
            //     Type: 'graph/line'
            // },
            // {
            //     Title: "Lista Circular",
            //     Subtitle: "Crea listas circulares estéticas",
            //     Type: 'list/circular'
            // },
            // {
            //     Title: "TAM, SAM, SOM",
            //     Subtitle: "Crea embudos para tu plan de empresa",
            //     Type: 'graph/tam'
            // },
            // {
            //     Title: "VS",
            //     Subtitle: "Permite votar entre dos conceptos distintos",
            //     Type: 'game/vs'
            // },
            // {
            //     Title: this.$t('math'),
            //     Subtitle: this.$t('mathSubtitle'),
            //     Type: 'tech/math',
            //     Color: 'blue darken-1',
            //     Image: 'https://firebasestorage.googleapis.com/v0/b/kanuki-app.appspot.com/o/Math.svg?alt=media&token=d4cf1b3f-d04e-4871-859c-972fa1cc0743'
            // },
        ],

        textCreator: false,
        mediaImageCreator: false,
        mediaVideoCreator: false,
        mediaYoutubeCreator: false,
        mediaAudioCreator: false,
        mediaPDFCreator: false,

        tableCreator: false,
        listCreator: false,
        textFormatCreator: false,

        mediaGalleryCreator: false,
        mediaCollageCreator: false,

        documentsDocCreator: false,
        documentsSpreadsheetCreator: false,
        documentsPresentationCreator: false,

        exerciseCardCreator: false,
        exerciseConnectCreator: false,
        exerciseTestCreator: false,
        exerciseWriteCreator: false,

        techCodeCreator: false,
        techLinechartCreator: false,
        techMathCreator: false, 

      }
    },

    components: {
        // TextCreator,
        // MediaImageCreator,
        // MediaVideoCreator,
        // MediaYoutubeCreator,
        // MediaAudioCreator,
        // MediaPdfCreator,


        // TableCreator,
        // ListCreator,
        // TextFormatCreator,

        // MediaGalleryCreator,
        // MediaCollageCreator,

        // DocumentsDocCreator,
        // DocumentsSpreadsheetCreator,
        // DocumentsPresentationCreator,

        // ExerciseCardCreator,
        // ExerciseConnectCreator,
        // ExerciseTestCreator,
        // ExerciseWriteCreator,

        // TechCodeCreator,
        // TechLinechartCreator, 
        // TechMathCreator,
    },

    methods: {

        createPage(type) {
            let id = window.location.pathname.replace(new RegExp('/', 'g'), '.').substr(1);
            id = (id[id.length - 1] == '.') ? id.substr(0, id.length - 1) : id
            this.$store.dispatch("page/createPage", {
                id,
                Type: type
            }).then(i => {
                this.dialog = false
                this.$router.replace({path: `${window.location.pathname}/nuevo_${i}`, query: { edit: 'true' }})
            })
        },

        getIcon(value) {
            return getIcon(value)
        },

    },

    computed: {
        user() {
            return this.$store.state.user.user
        },

        admin() {
            return this.$store.state.user.admin
        },

        renderListFiltered() {
            return this.renderList.filter(render => {
                return format(render.Title).includes(format(this.searchFilter)) || format(render.Subtitle).includes(format(this.searchFilter))
            })
        }
    }
  }
</script>

