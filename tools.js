
let getAccess = function(subject, userId) {
    console.log(subject)
    console.log(userId)
    switch (subject.Read) {
        case 'public':
            return true;
        case 'private':
            return subject.Author.id == userId
        case 'admins':
            return subject.Admins[userId] != null
    }
}

let getPathArray = function (path) {
    return path.split("/")
}

let getPathFather = function (path) {
    return path.substring(0, path.lastIndexOf("/"));
}

let getQuery = function(variable) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(variable);
}

let socialShare = function(option) {
    let url = window.location.href
    url = url.toString()
    console.log(url)
    switch (option) {
        case 'whatsapp':
        window.location.href = `whatsapp://send?text=${url}`
        break;
        case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, 'Facebook Share', 'height=500, width=600')
        break;
        case 'twitter':
        window.open(`https://twitter.com/home?status=${url}`, 'Twitter Share', 'height=500, width=600')
        break;
        case 'googleplus':
        window.open(`https://plus.google.com/share?url=${url}`, 'Google+ Share', 'height=500, width=350')
        break;
        case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}`, 'Linkedin Share', 'height=500, width=600')
        break;
        case 'telegram':
        window.location.href = `tg://msg_url?url=${url}`, 'Linkedin Share', 'height=500, width=600'
        break;
    }
}

    let getIcon = function(value) {
        if (!value) return 'file_copy'
        value = value.toString()
        if (value == 'section') {
            return 'folder'
        }
        else if (value == 'text/text') {
            return 'title'
        }
        else if (value == 'text/textformat') {
            return 'fas fa-font'
        } else if (value == 'media/image') {
            return 'image'
        } else if (value == 'media/video') {
            return 'video_library'
        } else if (value == 'media/youtube') {
            return 'fab fa-youtube'
        } else if (value == 'media/audio') {
            return 'audiotrack'
        } else if (value == 'media/gallery') {
            return 'collections'
        } else if (value == 'media/pdf') {
            return 'far fa-file-pdf'
        } else if (value == 'documents/doc') {
            return 'far fa-file'
        } else if (value == 'documents/spreadsheet') {
            return 'far fa-file-excel'
        } else if (value == 'documents/presentation') {
            return 'far fa-file-powerpoint'
        } else if (value == 'exercise/card') {
            return 'fas fa-bolt'
        } else if (value == 'exercise/test') {
            return 'fas fa-file-alt'
        } else if (value == 'exercise/write') {
            return 'fas fa-pen-square'
        } else if (value == 'tech/code') {
            return 'fas fa-code'
        } else if (value == 'tech/linechart') {
            return 'fas fa-chart-bar'
        } else if (value == 'tech/math') {
            return 'fas fa-superscript'
        } else if (value == 'game/vs') {
            return 'fas fa-vote-yea'
        } else if (value == 'business/bmc') {
            return 'fas fa-grip-horizontal'
        } else if (value == 'business/dafo') {
            return 'fas fa-poll'
        } else if (value == 'media/qr') {
            return 'fas fa-qrcode'
        } else if (value == 'game/voting') {
            return 'fas fa-poll-h'
        } else if (value == 'business/lc') {
            return 'fas fa-feather-alt'
        } else if (value == 'business/cv') {
            return 'fas fa-id-badge'
        } else if (value == 'graph/line') {
            return 'fas fa-chart-line'
        } else if (value == 'graph/tam') {
            return 'fas fa-chart-pie'
        } 
        else {
            return 'file_copy'
        }
        
    }

let getCardColor = function(color) {
    switch (color) {
        case this.$t('red'):
            return 'cardred'
        case this.$t('blue'):
            return 'cardblue'
        case this.$t('yellow'):
            return 'cardyellow'
        case this.$t('green'):
            return 'cardgreen'
        case this.$t('purple'):
            return 'cardpurple'
        case this.$t('grey'):
            return 'cardgrey'
        case this.$t('brown'):
            return 'cardbrown'
        case this.$t('orange'):
            return 'cardorange'
        case this.$t('olive'):
            return 'cardolive'
        case this.$t('navy'):
            return 'cardnavy'
        case this.$t('turquese'):
            return 'cardturquese'

    }
}



export {
    getAccess,
    socialShare,
    getQuery,
    getIcon,
    getCardColor,
    getPathArray,
    getPathFather
}