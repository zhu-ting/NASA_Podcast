function convertISODateToAEST(isoDate) {
    try {
        const event = new Date(isoDate)
        const formatDate = event.toLocaleDateString('en-Au', { timeZone: 'Australia/Sydney' })
        console.log(formatDate)
        if (formatDate === 'Invalid Date') throw Error('Please enter a valid date')
        return `${formatDate} AEST`
    } catch (error) {
        console.log('Error:', error.message)
    }
}

module.exports = {
    convertISODateToAEST
}
