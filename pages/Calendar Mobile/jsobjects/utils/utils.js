export default {
	generateRandomTimeInWorkingHours: () => {
		const workingStart = moment().tz(sel_timeZone.selectedOptionValue).startOf('day').add(8, 'hours'); // Start at 8:00 AM
		const workingEnd = moment().tz(sel_timeZone.selectedOptionValue).startOf('day').add(18, 'hours'); // End at 6:00 PM

		const randomTime = workingStart.clone().add(
			Math.floor(Math.random() * workingEnd.diff(workingStart, 'minutes')) * 60 * 1000
		);

		return randomTime.toISOString();
	},
	generateAvailableSlots: async () => {
		const data = await getEvents.run();
		const events = data.items;
		const now = moment().tz(sel_timeZone.selectedOptionValue).startOf('hour').add(30, 'minutes');
		const endTime = now.clone().set({ hour: 18, minute: 0, second: 0, millisecond: 0 });

		if (events && events.length > 0) {
			const takenSlots = events
			.filter((event) => {
				const eventStart = moment(event.start.dateTime).tz(event.start.timeZone);
				const eventEnd = moment(event.end.dateTime).tz(event.end.timeZone);
				return eventStart.isBefore(endTime) && eventEnd.isAfter(now);
			})
			.map((event) => {
				const eventStart = moment(event.start.dateTime).tz(event.start.timeZone);
				const eventEnd = moment(event.end.dateTime).tz(event.end.timeZone);
				return { start: eventStart, end: eventEnd };
			});

			const availableSlots = [];

			while (now.isBefore(endTime)) {
				const slotEnd = now.clone().add(sel_meetingDuration.selectedOptionValue, 'minutes');
				const isAvailable = takenSlots.every((takenSlot) => {
					return slotEnd.isSameOrBefore(takenSlot.start) || now.isSameOrAfter(takenSlot.end);
				});

				if (isAvailable) {
					const formattedTime = `${now.format('h:mmA')} - ${slotEnd.format('h:mmA')}`;
					const isoTime = now.toISOString();
					availableSlots.push({ formattedTime, isoTime });
				}

				now.add(sel_meetingDuration.selectedOptionValue, 'minutes');
			}

			return availableSlots.map(s => {
				return {
					id: Math.random(),
					...s,
				}
			});
		} else {
			// Mock the response if there are no events
			const availableSlots = [];

			for (let i = 0; i < 5; i++) { // Adjust the number of slots as needed
				const randomStartTime = utils.generateRandomTimeInWorkingHours();
				const startTime = moment(randomStartTime).tz(sel_timeZone.selectedOptionValue);
				const endTime = startTime.clone().add(sel_meetingDuration.selectedOptionValue, 'minutes');

				const formattedTime = `${startTime.format('h:mmA')} - ${endTime.format('h:mmA')}`;
				availableSlots.push({ formattedTime, isoTime: startTime.toISOString() });
			}

			return availableSlots.map(s => {
				return {
					id: Math.random(),
					...s
				}
			});
		}	},
	
	createEvent: async () => {
		const events = getEvents.data;
		if (events && events.items) {
			await createEvent.run();
			showAlert('Event Created!', 'success');
			closeModal('mdl_newEvent');
		} else {
			showAlert('Event Created!', 'success');
			closeModal('mdl_newEvent');
		}
	},
}