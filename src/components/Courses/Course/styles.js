import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		'&>*': {
			margin: 10
		}
	}, display: {
		display: 'flex',
		alignItems: 'center'
	},
	leftItem: {
		justifySelf: ' flex-end',
		display: 'flex',
		justifyContent: ' space-between',
		alignItems: 'center'
	}
}));