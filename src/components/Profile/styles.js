import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
	buttonBox: {
		display: 'flex', justifyContent: 'space-between',
		'&>*': {
			margin: 10
		}
	}
}));
