import { createSlice, current } from '@reduxjs/toolkit';

const initialCourseDetailState = {
	isUpdating: false,
	details: null,
	scores: {},
	studentsOfCourse: [],
	teachersOfCourse: [],
	studentsInvited: [],
	teachersInvited: [],
	notifications: []
};

const courseDetailSlice = createSlice({
	name: 'courseDetail',
	initialState: initialCourseDetailState,
	reducers: {
		changeIsUpdating(state, action) {
			state.isUpdating = action.payload;
		},
		updateCourse(state, action) {
			const currentState = current(state);
			const updatedCourse = action.payload;
			state.details = { ...currentState.details, ...updatedCourse };
		},
		storeCourseDetails(state, action) {
			const course = action.payload;
			state.details = action.payload;
			state.notifications = course.notifications;
			const studentsOfCourse = [];
			const teachersOfCourse = [];
			const studentsInvited = [];
			const teachersInvited = [];
			for (const member of course.participants) {
				if (member.Participant.role === 'student') {
					if (member.Participant.status === 'accepted') {
						studentsOfCourse.push(member);
					} else if (member.Participant.status === 'invited') {
						studentsInvited.push({ email: member.email, status: member.Participant.status });
					}
				} else if (member.Participant.role === 'teacher') {
					if (member.Participant.status === 'accepted') {
						teachersOfCourse.push(member);
					} else if (member.Participant.status === 'invited') {
						teachersInvited.push({ email: member.email, status: member.Participant.status });
					}
				}
			}
			for (const invitee of course.invitees) {
				if (invitee.role === 'teacher') {
					teachersInvited.push({ email: invitee.userEmail, status: 'invited' });
				} else {
					studentsInvited.push({ email: invitee.userEmail, status: 'invited' });
				}
			}
			state.studentsOfCourse = studentsOfCourse;
			state.teachersOfCourse = teachersOfCourse;
			state.studentsInvited = studentsInvited;
			state.teachersInvited = teachersInvited;
		},
		deleteParticipant(state, action) {
			const currentState = current(state);
			const participants = [];
			const userId = action.payload.userId;
			let role = action.payload.role;

			currentState.details.participants.forEach((par) => {
				if (par.id !== userId) {
					participants.push(par);
				}
			});
			if (role === 'student') {
				const students = [];
				currentState.studentsOfCourse.forEach((par) => {
					if (par.id !== userId) {
						students.push(par);
					}
				});
				state.studentsOfCourse = students;
			} else {
				const teachers = [];
				currentState.teachersOfCourse.forEach((par) => {
					if (par.id !== userId) {
						teachers.push(par);
					}
				});
				state.teachersOfCourse = teachers;
			}

			state.details = { ...state.details, participants: participants };
		},
		inviteByEmail(state, action) {
			const { emailList, withRole } = action.payload;

			for (const email of emailList) {
				if (withRole === 'teacher') {
					state.teachersInvited = [...state.teachersInvited, { email, status: 'invited' }];
					state.studentsInvited = state.studentsInvited.filter((student) => student.email !== email);
				} else if (withRole === 'student') {
					state.studentsInvited = [...state.studentsInvited, { email, status: 'invited' }];
					state.teachersInvited = state.teachersInvited.filter((student) => student.email !== email);
				}
			}
		},
		addMemberToCourse(state, action) {
			const currentState = current(state);
			const { email } = action.payload;
			const newStudentsInvited = [];
			const newTeachersInvited = [];
			for (const invitee of currentState.studentsInvited) {
				if (invitee.email !== email) newStudentsInvited.push(invitee);
			}

			for (const invitee of currentState.teachersInvited) {
				if (invitee.email !== email) newTeachersInvited.push(invitee);
			}

			state.studentsInvited = newStudentsInvited;
			state.teachersInvited = newTeachersInvited;
		},
		storeScores(state, action) {
			state.scores = action.payload;
		},
		createNotification(state, action) {
			state.notifications = [action.payload, ...state.notifications];
		},
		deleteNotification(state, action) {
			const currentState = current(state);
			const noticeId = action.payload;
			const notifications = [];
			currentState.notifications.forEach((notice) => {
				if (notice.id !== noticeId) {
					notifications.push(notice);
				}
			});
			state.notifications = notifications;
		}
	}
});

export const courseDetailActions = courseDetailSlice.actions;

export default courseDetailSlice;
