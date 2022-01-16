import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		'&>*': {
			margin: 10
		}
	}
}));