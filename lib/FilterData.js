import moment from 'moment'

import ParseHour from './ParseHour'

export function getOffenseTypeData(data, labels) {
	const offenseTypeData = labels.map(() => 0)

	for (let i in data) {
		offenseTypeData[labels.indexOf(data[i].offense)]++
	}

	return offenseTypeData
}

export function getOffenseGroupData(data, labels) {
	const offenseGroupData = labels.map(() => 0)

	for (let i in data) {
		offenseGroupData[labels.indexOf(data[i].offense_group)]++
	}

	return offenseGroupData
}

export function getDateData(data) {
	const dateData = []

	for (let i in data) {
		if (data[i].start_date != '') {
			const date = data[i].start_date.substr(
				0,
				data[i].start_date.indexOf(',')
			)

			const formatDate = moment(new Date(date)).format('YYYY-MM')

			const dateIndex = dateData.findIndex(
				(element) => element.x === formatDate
			)
			if (dateIndex != -1) {
				dateData[dateIndex].y++
			} else {
				dateData.push({x: formatDate, y: 1})
			}
		}
	}
	dateData.sort((a, b) => (moment(a.x).isAfter(b.x) ? 1 : -1))

	return dateData
}

export function getTimeData(data) {
	const timeData = []

	for (let i in data) {
		if (data[i].start_date != '') {
			const time = data[i].start_date.substr(
				data[i].start_date.indexOf(',') + 2,
				data[i].start_date.length
			)
			const formatTime = moment(time, ['h:mm A']).format('HH')
			const timeIndex = timeData.findIndex(
				(element) => element.x._i === formatTime
			)
			if (timeIndex !== -1) {
				timeData[timeIndex].y++
			} else {
				timeData.push({x: ParseHour(formatTime), y: 1})
			}
		}
	}
	timeData.sort((a, b) => (a.x._i > b.x._i ? 1 : -1))

	return timeData
}
