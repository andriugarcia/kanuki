import { set, unshift } from '@/f'

const notification = {
    actions: {
        sendNotification: (value) => {

            unshift('users', value.id, 'notifications', value.value)

        },

        readAll: (context) => {
            var notifications = context.state.user.user.notifications

            notifications.forEach(notification => {
            notification.Read = true
            })

            set('users', context.state.user.user.id, {
            notifications
            })

        }
    }
}

export default notification